import json
import requests
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel

# ---- URL del microservicio Express-Mongo (Docker) ----
BACKEND_URL = "http://localhost:3030"
# ---- URL del analizador de sentimiento (IBM Code Engine) ----
SENTIMENT_URL = "http://localhost:5050"


# ============================================================
# AUTH VIEWS
# ============================================================

@csrf_exempt
def login_user(request):
    if request.method == "GET":
        data = json.loads(request.body)
        username = data.get("userName")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"status": "Authenticated", "userName": username})
        return JsonResponse({"status": "Failed"})


@csrf_exempt
def logout_request(request):
    logout(request)
    return JsonResponse({"status": "Successfully Logged out"})


@csrf_exempt
def registration(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("userName")
        password = data.get("password")
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Already Registered"})

        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        login(request, user)
        return JsonResponse({"status": "Authenticated", "userName": username})


# ============================================================
# PROXY VIEWS - Cars
# ============================================================

def get_cars(request):
    cars = CarModel.objects.select_related("car_make")
    car_list = [
        {
            "id": c.id,
            "name": c.name,
            "make": c.car_make.name,
            "type": c.type,
            "year": c.year,
        }
        for c in cars
    ]
    makes = CarMake.objects.all()
    make_list = [{"id": m.id, "name": m.name} for m in makes]
    return JsonResponse({"CarMakes": make_list, "CarModels": car_list})


# ============================================================
# PROXY VIEWS - Dealers (llamadas a Express-Mongo)
# ============================================================

def get_dealers(request):
    url = f"{BACKEND_URL}/fetchDealers"
    response = requests.get(url)
    return JsonResponse(response.json(), safe=False)


def get_dealers_by_state(request, state):
    url = f"{BACKEND_URL}/fetchDealers/{state}"
    response = requests.get(url)
    return JsonResponse(response.json(), safe=False)


def get_dealer_by_id(request, dealer_id):
    url = f"{BACKEND_URL}/fetchDealer/{dealer_id}"
    response = requests.get(url)
    return JsonResponse(response.json(), safe=False)


def get_dealer_reviews(request, dealer_id):
    url = f"{BACKEND_URL}/fetchReviews/dealer/{dealer_id}"
    response = requests.get(url)
    reviews = response.json()

    # Enrich with sentiment
    for review in reviews:
        text = review.get("review", "")
        try:
            sentiment_resp = requests.get(f"{SENTIMENT_URL}/analyze/{text}")
            review["sentiment"] = sentiment_resp.json().get("sentiment", "neutral")
        except Exception:
            review["sentiment"] = "neutral"

    return JsonResponse(reviews, safe=False)


@csrf_exempt
def add_review(request):
    if request.method == "POST" and request.user.is_authenticated:
        data = json.loads(request.body)
        data["name"] = request.user.get_full_name()
        data["user_id"] = request.user.id
        url = f"{BACKEND_URL}/insertReview"
        response = requests.post(url, json=data)
        return JsonResponse(response.json())
    return JsonResponse({"status": "Unauthorized"}, status=401)
