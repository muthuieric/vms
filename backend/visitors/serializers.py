from rest_framework import serializers
from .models import Visitor

class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = ['id', 'Name', 'Id_number', 'Phone', 'Email', 'Red_flag']
