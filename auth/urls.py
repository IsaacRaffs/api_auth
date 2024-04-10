from django.urls import path
from auth.views import SignupAPIView, SigninAPIView
from rest_framework.authtoken.views import ObtainAuthToken

urlpatterns = [
    path('auth/signup', SignupAPIView.as_view()),
    path('auth/signin', ObtainAuthToken.as_view()),
]
