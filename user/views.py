from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status
from .models import UserModel
from .serializers import UserSerializer

class ListCreateUser(APIView):
    def get(self, request):
        users = UserModel.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=200)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=200)
    
class DetailUpdateDeleteUser(APIView):
    def get_user(self, pk):
        try:
            return UserModel.objects.get(pk=pk)
        except UserModel.DoesNotExist:
            return Http404
        
    def get(self, request, pk):
        users = self.get_user(pk)
        serializer = UserSerializer(users)
        return Response(serializer.data, status=200)
    
    def put(self, request, pk):
        users = self.get_user(pk)
        serializer = UserSerializer(users, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)
    
    def delete(self, request, pk):
        alvo = self.get_user(pk)
        alvo.delete()
        return Response(status=204)

