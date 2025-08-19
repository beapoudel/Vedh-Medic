from django.db import models
from django.contrib.auth.models import User
class Conversation(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    send=models.CharField(max_length=500)
    receive=models.CharField()
    date = models.DateField(auto_now_add=True)  
    time = models.TimeField(auto_now_add=True)
    file = models.FileField(upload_to="uploads/", blank=True, null=True)
