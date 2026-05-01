from django.urls import path
from . import views

urlpatterns = [
    path('login',              views.login_user,          name='login'),
    path('logout',             views.logout_request,      name='logout'),
    path('register',           views.registration,        name='register'),
    path('get_cars',           views.get_cars,            name='get_cars'),
    path('get_dealers',        views.get_dealers,         name='get_dealers'),
    path('get_dealers/<str:state>', views.get_dealers_by_state, name='get_dealers_by_state'),
    path('dealer/<int:dealer_id>',  views.get_dealer_by_id,    name='get_dealer_by_id'),
    path('review/dealer/<int:dealer_id>', views.get_dealer_reviews, name='get_dealer_reviews'),
    path('add_review',         views.add_review,          name='add_review'),
]
