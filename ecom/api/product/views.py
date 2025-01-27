from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product

class ProductViewset(viewsets.ModelViewSet):
    queryset=Product.objects.all().order_by('id')
    serializer_class=ProductSerializer

# Create your views here.
