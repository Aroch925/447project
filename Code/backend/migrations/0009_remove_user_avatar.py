# Generated by Django 2.0.4 on 2018-05-08 06:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_user_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar',
        ),
    ]
