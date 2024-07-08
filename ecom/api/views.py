from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.core import mail

# Create your views here.
def home(request):
    return JsonResponse({'info':'Django React','name':'Abhi'})
