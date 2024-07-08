from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Contact
from .serializers import ContactSerializer
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import viewsets

from django.core.mail import send_mail
from django.conf import settings


def contact_view(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            print("Serializer is valid")
            name =serializer.validated_data.get('name')
            email = serializer.validated_data.get('email')
            msg = serializer.validated_data.get('message')

            print("Name:", name)
            print("Email:", email)
            print("Message:", msg)
            
            subject = 'Title'
            message= f"Name: {name}\nEmail: {email}\Message: {msg}"
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail( subject, message, email_from, recipient_list,fail_silently=True)
            serializer.save()
            return Response(serializer.data, status=200)
    else:
        print("Serializer is NOT valid")
        return JsonResponse(serializer.errors, status=400)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    authentication_classes = []
    permission_classes = [AllowAny]