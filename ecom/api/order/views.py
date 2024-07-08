from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .serializers import OrderSerializer
from .models import Order
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import TokenAuthentication


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([TokenAuthentication])
def add_order(request, id, token):
    print(f'Received id: {id}, token: {token}')
    user_id = id
    transaction_id = request.data.get('transaction_id')
    amount = request.data.get('amount')
    products = request.data.get('products')

    total_pro = len(products.split(',')) if products else 0

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=user_id)
    except UserModel.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    order_data = {
        'user': user_id,
        'products_names': products,
        'total_products': total_pro,
        'transaction_id': transaction_id,
        'total_amount': amount
    }

    serializer = OrderSerializer(data=order_data)
    if serializer.is_valid():
        serializer.save()
        print("Saved Order Data:", serializer.data)
        return Response({'success': True, 'fail': False, 'msg': 'Order placed successfully'}, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('id')
