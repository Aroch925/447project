from django.db import models

class User(models.Model):

    userName = models.CharField(max_length=20, help_text="Enter User Name")
    password = models.CharField(max_length=20, help_text="Enter a password")

    first = models.CharField(max_length=20, help_text="Enter your first Name")
    last = models.CharField(max_length=20, help_text="Enter your last name")
    
    admin = models.BooleanField(default=False)
    public = models.BooleanField(default=True)

    about_me = models.CharField(max_length=100, default="")

    question1 = models.IntegerField(default=0)
    question2 = models.IntegerField(default=0)
    question3 = models.IntegerField(default=0)
    question4 = models.IntegerField(default=0)
    question5 = models.IntegerField(default=0)
    question6 = models.IntegerField(default=0)
    question7 = models.IntegerField(default=0)
    question8 = models.IntegerField(default=0)

    result1 = models.CharField(max_length=30, default="")
    result2 = models.CharField(max_length=30, default="")
    result3 = models.CharField(max_length=30, default="")
    result4 = models.CharField(max_length=30, default="")
    result5 = models.CharField(max_length=30, default="")
    result6 = models.CharField(max_length=30, default="")
    result7 = models.CharField(max_length=30, default="")
    result8 = models.CharField(max_length=30, default="")
    result9 = models.CharField(max_length=30, default="")
    result10 = models.CharField(max_length=30, default="")

    avatar = models.FileField(blank=False, null=False, default="profile-placeholder.png")



    


