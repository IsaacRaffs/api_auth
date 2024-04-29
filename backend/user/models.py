from django.db import models
from django.contrib.auth.models import User

class UserModel(models.Model):
    name = models.CharField(max_length=60)
    age = models.PositiveIntegerField(blank=True)
    email = models.EmailField(null=True)
    
    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        default=None
    )