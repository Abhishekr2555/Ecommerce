

from rest_framework import routers
from django.urls import path,include
from .views import ContactViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'', views.ContactViewSet,basename='contact')

urlpatterns = [
    # path('contact/',views.contact_view,name='contact'),
    path('',include(router.urls)),
]