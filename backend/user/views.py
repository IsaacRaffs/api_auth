from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import UserModel
from .serializers import UserSerializer


class ListCreateUser(ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        usuario = self.request.user
        return UserModel.objects.filter(usuario=usuario)

    def post(self, request):
        request.data['usuario'] = request.user.pk
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class DetailUpdateDeleteUser(RetrieveUpdateDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        usuario = self.request.user
        return UserModel.objects.filter(usuario=usuario)    
    
    def put(self, request, pk, *args, **kwargs):
        user = request.user
        users = UserModel.objects.get(pk=pk)

        if users.usuario != user:
            return Response(
                {'detail': 'Você só pode editar seu próprio perfil'},
                status=400
            )

        return self.update(request, request.user)
