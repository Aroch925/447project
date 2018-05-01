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
        params = request.query_params.get('userName', None)
        
        # Get one user if there is a userName parameter
        if params is not None:
            print("yes")
            user = User.objects.get(userName=params)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        # Get all if no parameters
        else:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

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
        user = User.object.get(userName=request.data["userName"])
        user.password = request.data["password"]
        user.first = request.data["first"]
        
        user.admin = request.data["last"]
        user.public = request.data["public"]
        
        user.question1 = request.data["question1"]
        user.question2 = request.data["question2"]
        user.question3 = request.data["question3"]
        user.question4 = request.data["question4"]
        user.question5 = request.data["question5"]
        user.question6 = request.data["question6"]
        user.question7 = request.data["question7"]
        user.question8 = request.data["question8"]

        user.result1 = request.data["result1"]
        user.result2 = request.data["result2"]
        user.result3 = request.data["result3"]
        user.result4 = request.data["result4"]
        user.result5 = request.data["result5"]

        user.save()

        return Response({"success": "It worked"})

    # For deleting a User
    def delete(self, request):
        user = User.object.get(userName=request.data["userName"])
        user.delete()
        return Response({"success": "It worked"})
