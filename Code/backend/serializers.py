from rest_framework import serializers
from backend.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'userName', 'password', 'first', 'last', 'about_me', 'admin', 'public', 'question1', 'question2', 'question3', 'question4', 'question5', 'avatar'

class AuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'userName', 'password'

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'result1', 'result2', 'result3', 'result4', 'result5', 'result6', 'result7', 'result8', 'result9', 'result10'