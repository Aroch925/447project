from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.serializers import UserSerializer
from backend.serializers import AuthSerializer

from backend.models import User

class AuthenticateView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)

    def post(self, request):
        user = User.objects.get(userName=request.data["userName"])
        serializer = AuthSerializer(data=request.data)
        if serializer.is_valid():
            if not user:
                return Response({"error": "Username or Password Incorrect"})
            elif user and user.password != request.data["password"]:
                return Response({"error": "Username or Password Incorrect"})
            elif user and user.password == request.data["password"]:
                return Response({"success": "access granted"})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):

    # For retrieving User information
    def get(self, request):

        return Response({"test": "It worked"} )

    # For adding a User to the database
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.all().filter(userName=request.data["userName"])
            if User.objects.filter(userName=request.data["userName"]).exists():
                return Response({"error": "Username already taken"})
            else:
                serializer.save()
                return Response({"success": serializer.data})
        return Response(serializer.errors, status=status_HTTP_404_BAD_REQUEST)

    # For updating a User in the database
    def put(self, request):
        return Response({"test": "It worked"})

    # For deleting a User
    def delete(self, request):
        return Response({"test": "It worked"})
