from django.urls import path
from auth.views import SignupAPIView, SigninAPIView

urlpatterns = [
    path('auth/signup', SignupAPIView.as_view()),
    path('auth/signin', SigninAPIView.as_view()),
]