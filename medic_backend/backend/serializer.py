from rest_framework import serializers
from backend.models import Conversation
from django.contrib.auth.models import User


class Conversation_serializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all()
    )
    class Meta:
        model=Conversation
        fields=['user','send','receive','date', 'time','file']

class RegisterSerializer(serializers.Serializer):
    username=serializers.CharField()
    email=serializers.CharField()
    password=serializers.CharField()
    def validate(self,data):
        if data['username']:
            if User.objects.filter(username=data['username']).exists():
                raise serializers.ValidationError({'username': 'Username is already taken'})
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError({'email': 'Email is already taken'})
            return data
    def create(self,validate_data):
        user=User.objects.create(username=validate_data['username'],email=validate_data['email'])
        user.set_password(validate_data['password'])
        user.save()
        return validate_data
    
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()