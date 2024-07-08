from rest_framework import routers
from django.urls import path, include
from .views import OrderViewSet
from .import views

router = routers.DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
urlpatterns = [
    path('add/<str:id>/<str:token>/', views.add_order, name='add_order'),
    path('', include(router.urls))
]
