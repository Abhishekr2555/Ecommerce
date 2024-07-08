from rest_framework import serializers
from .models import Order,CustomUser,Product
from django.contrib.auth import get_user_model
# from .serializers import UserSerializer
from rest_framework.response import Response

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    user=serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Order
        fields = ('user',)
       
    
