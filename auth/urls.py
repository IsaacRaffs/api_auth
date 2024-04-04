from django.urls import path
from .views import UserSignup
from rest_framework.authtoken import views

urlpatterns = [
    path('auth/signup', UserSignup.as_view()),
    path('auth/signin', views.obtain_auth_token),
]
