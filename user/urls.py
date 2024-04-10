from django.urls import path
from .views import (
    ListCreateUser, 
    DetailUpdateDeleteUser
    )
urlpatterns = [
    path('user/', ListCreateUser.as_view()),
    path('user/<int:pk>', DetailUpdateDeleteUser.as_view()),
]
