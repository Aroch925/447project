from rest_framework import serializers
from backend.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'userName', 'password', 'first', 'last'

class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'userName', 'password'