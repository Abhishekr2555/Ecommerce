from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    name=models.CharField(max_length=50,default='Anonymous')
    email=models.CharField(max_length=254,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    username=None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    phone=models.CharField(max_length=20,blank=True,null=True)
    gender=models.CharField(max_length=10,blank=True,null=True)

    session_token=models.CharField(max_length=10,default=0)

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    # groups = models.ManyToManyField('auth.Group', related_name='custom_users')
    # user_permissions = models.ManyToManyField('auth.Permission', related_name='custom_users')

    def __str__(self):
        return self.email
    
    #abhishekrathod9318@gmail.com
    #python manage.py runserver
    #python manage.py makemigrations
    #python manage.py migrate
    #python manage.py createsuperuser