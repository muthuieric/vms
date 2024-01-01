from rest_framework import serializers
from .models import Tm


class TmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tm
        fields = ('id',
                  'Name',
                  'Phone',
                  'Email')