from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer

class AuthSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password']
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user