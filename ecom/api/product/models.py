from django.db import models
from api.catagory.models import Catagory
# Create your models here.

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Product(models.Model):
    name=models.CharField(max_length=50)
    description=models.CharField(max_length=1000)
    price=models.CharField(max_length=50)
    stock=models.CharField(max_length=50)
    is_active=models.BooleanField(default=True,blank=True)
    img=models.ImageField(upload_to=upload_to,blank=True,null=True)
    catagory=models.ForeignKey(Catagory,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name