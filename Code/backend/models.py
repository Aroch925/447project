from django.db import models

class User(models.Model):

    userName = models.CharField(max_length=20, help_text="Enter User Name")
    password = models.CharField(max_length=20, help_text="Enter a password")

    first = models.CharField(max_length=20, help_text="Enter your first Name")
    last = models.CharField(max_length=20, help_text="Enter your last name")

