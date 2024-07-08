from rest_framework import serializers
from .models import Catagory

class CatagorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Catagory
        fields=('name','description')