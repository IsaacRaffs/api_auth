from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AuthSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny


class SignupAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AuthSerializer
    permission_classes = [AllowAny]

class SigninAPIView(APIView):

    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response(data={'access_token': token.key})