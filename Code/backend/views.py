from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.serializers import UserSerializer
from backend.serializers import AuthSerializer
from backend.serializers import ResultsSerializer
from backend.get_top_counties import bestCounties_immediate
from rest_framework.parsers import MultiPartParser

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
        user = User.objects.get(userName=request.data["userName"])
        
        if 'password' in request.data:
            user.password = request.data["password"]
        if 'first' in request.data:
            user.first = request.data["first"]
        if 'last' in request.data:
            user.last = request.data["last"]
        if 'admin' in request.data:
            user.admin = request.data["admin"]
        if 'public' in request.data:
            user.public = request.data["public"]
        if 'about_me' in request.data:
            user.about_me = request.data["about_me"]
        if 'avatar' in request.data:
            user.avatar = request.data["avatar"]
        if 'question1' in request.data:
            user.question1 = request.data["question1"]
        if 'question2' in request.data:
            user.question2 = request.data["question2"]
        if 'question3' in request.data:
            user.question3 = request.data["question3"]
        if 'question4' in request.data:
            user.question4 = request.data["question4"]
        if 'question5' in request.data:
            user.question5 = request.data["question5"]

        if 'result1' in request.data:
            user.result1 = request.data["result1"]
        if 'result2' in request.data:
            user.result2 = request.data["result2"]
        if 'result3' in request.data:
            user.result3 = request.data["result3"]
        if 'result4' in request.data:
            user.result4 = request.data["result4"]
        if 'result5' in request.data:
            user.result5 = request.data["result5"] 
        if 'result6' in request.data:
            user.result1 = request.data["result6"]
        if 'result7' in request.data:
            user.result2 = request.data["result7"]
        if 'result8' in request.data:
            user.result3 = request.data["result8"]
        if 'result9' in request.data:
            user.result4 = request.data["result9"]
        if 'result10' in request.data:
            user.result5 = request.data["result10"] 
        
        user.save()

        return Response({"success": "It worked"})

    # For deleting a User
    def delete(self, request):
        params = request.query_params.get('userName', None)
        user = User.objects.get(userName=params)
        user.delete()
        return Response({"success": "It worked"})


class ResultsView(APIView):

    def post(self, request):

        user = User.objects.get(userName=request.data['userName'])
        arr = [0] * 12
        arr[2] = int(request.data['question3'])
        arr[3] = int(request.data['question2'])
        arr[4] = int(request.data['question1'])
        arr[7] = int(request.data['question4'])
        arr[6] = int(request.data['question5'])

        results = bestCounties_immediate("C:/Users/aroch/Desktop/Group2Project/Census_Data_Massage/processed_sheets/census_selected_data.xlsx", arr)

        user.result1 = results[0][0]
        user.result2 = results[1][0]
        user.result3 = results[2][0]
        user.result4 = results[3][0]
        user.result5 = results[4][0]
        user.result6 = results[5][0]
        user.result7 = results[6][0]
        user.result8 = results[7][0]
        user.result9 = results[8][0]
        user.result10 = results[9][0]
        user.save()
        
        return Response({"success": "It worked"})

    def get(self, request):
        params = request.query_params.get('userName', None)
        if params is not None:
            user = User.objects.get(userName=params)
            serializer = ResultsSerializer(user)
            return Response(serializer.data)
        return Response({"success": "It worked"})

class UploadView(APIView):
    parser_classes = (MultiPartParser,)

    def get(self, request):
        return Response({"success": "It worked"})

    def post(self, request):
        print(request)
        #file_obj = request.data['file']
        #ftype = request.data['ftype']

        return Response(status=204)