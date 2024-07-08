from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    img = serializers.ImageField(max_length=None, use_url=True,required=False)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'img', 'catagory')