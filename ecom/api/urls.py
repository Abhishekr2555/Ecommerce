from django.urls import path,include
from rest_framework.authtoken import views
from .views import home
urlpatterns = [
    path('',home,name='api.home'),
    path('catagory/',include('api.catagory.urls')),
    path('product/',include('api.product.urls')),
    path('user/',include('api.user.urls')),
    path('order/',include('api.order.urls')),
    path('payment/',include('api.payment.urls')),
    path('contact/',include('api.contact.urls')),
    path('api-token-auth/',views.obtain_auth_token,name='api_token_auth'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    
]
