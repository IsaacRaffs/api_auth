from django.db import models

class UserModel(models.Model):
    name = models.CharField(max_length=60)
    age = models.PositiveIntegerField(blank=True)
