# Best Cars Dealership Portal

## IBM Full Stack Software Developer Professional Certificate - Capstone Project

A full-stack web application for a national car dealership chain that allows customers to browse dealership branches, read reviews, and submit their own reviews.

---

## Project Architecture

The solution uses a **microservices architecture** with the following components:

| Component | Technology | Purpose |
|---|---|---|
| Main App | Django + SQLite | User management, car models, proxy services |
| Frontend | React | Dynamic UI for dealers, reviews, and forms |
| Backend API | Node.js + Express + MongoDB | Dealers and reviews CRUD endpoints |
| Sentiment Analyzer | Python + Flask + NLTK | Analyzes review sentiment (positive/negative/neutral) |
| Deployment | Docker + Kubernetes | Containerized cloud deployment |
| CI/CD | GitHub Actions | Automated linting and continuous delivery |

---

## Features

- ✅ Browse all dealership branches across the USA
- ✅ Filter dealerships by state
- ✅ View customer reviews per dealership with sentiment labels
- ✅ User registration and login (Django Auth + React)
- ✅ Submit reviews for any dealership (logged-in users only)
- ✅ Admin panel for managing car makes and models
- ✅ Sentiment analysis powered by IBM Cloud Code Engine
- ✅ Fully containerized and deployable on Kubernetes

---

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Django, Python, Flask, Node.js, Express
- **Databases**: SQLite (Django), MongoDB (Reviews/Dealers)
- **DevOps**: Docker, Kubernetes, GitHub Actions
- **Cloud**: IBM Cloud Code Engine (Sentiment Analyzer)

---

## API Endpoints

### Express-Mongo Service (Port 3030)
```
GET /fetchDealers             - All dealerships
GET /fetchDealer/:id          - Dealership by ID
GET /fetchDealers/:state      - Dealerships by state
GET /fetchReviews/dealer/:id  - Reviews for a dealership
POST /insertReview            - Add a new review
```

### Django Proxy Service (Port 8000)
```
GET /djangoapp/get_cars       - Car makes and models
GET /djangoapp/get_dealers    - All dealers (proxy)
GET /djangoapp/dealer/:id     - Dealer details (proxy)
GET /djangoapp/review/dealer/:id  - Reviews (proxy)
POST /djangoapp/add_review    - Submit a review
```

### Sentiment Analyzer (IBM Code Engine)
```
GET /analyze/:text            - Returns: positive / negative / neutral
```

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/<YOUR_USERNAME>/xrwvm-fullstack_developer_capstone.git
cd xrwvm-fullstack_developer_capstone

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Run Django migrations
cd server
python manage.py makemigrations
python manage.py migrate

# 4. Create superuser
python manage.py createsuperuser

# 5. Run Django server
python manage.py runserver

# 6. Start Express-Mongo service
cd server/database
docker-compose up --build -d

# 7. Build and run React frontend
cd server/frontend
npm install
npm run build
```

---

## Submission Artifacts

All evidence files are located in the `/capstone_evidencia` folder:

### Terminal Output Files
- `django_server.txt` - Django server running
- `loginuser.txt` - cURL login operation
- `logoutuser.txt` - cURL logout operation
- `getalldealers.txt` - cURL get all dealers
- `getdealerbyid.txt` - cURL get dealer by ID
- `getdealersbyState.txt` - cURL get dealers in Kansas
- `getdealerreviews.txt` - cURL get reviews for a dealer
- `getallcarmakes.txt` - cURL get all car makes and models
- `analyzereview.txt` - cURL sentiment analysis
- `CICD.txt` - GitHub Actions CI/CD output
- `deploymentURL.txt` - Live deployment URL

### Screenshots
- `about_us.png`, `contact_us.png`, `login_page.png`, `logout_alert.png`
- `signup_page.png`, `admin_login.png`, `admin_logout.png`
- `cars.png`, `car_models_admin.png`, `sentiment_analyzer.png`
- `get_dealers.png`, `get_dealers_loggedin.png`, `dealersbystate.png`
- `dealer_id_reviews.png`, `dealership_review_submission.png`, `added_review.png`
- `github_cicd.png`, `deployed_landingpage.png`, `deployed_loggedin.png`
- `deployed_dealer_detail.png`, `deployed_add_review.png`

---

## Author

Ivan - IBM Full Stack Software Developer Professional Certificate  
Completed: April 2026
