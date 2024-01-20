# serializers.py
from rest_framework import serializers
from .models import CustomUserModel

class CustomUserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ['pk', 'email', 'first_name', 'last_name', 'role']
