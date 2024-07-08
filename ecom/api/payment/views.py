from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree
from decouple import config
# Create your views here.


BRAINTREE_MERCHANT_ID = config('BRAINTREE_MERCHANT_ID')
BRAINTREE_PUBLIC_KEY = config('BRAINTREE_PUBLIC_KEY')
BRAINTREE_PRIVATE_KEY = config('BRAINTREE_PRIVATE_KEY')

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id=BRAINTREE_MERCHANT_ID, 
        public_key=BRAINTREE_PUBLIC_KEY,
        private_key=BRAINTREE_PRIVATE_KEY
    )
)


def validate_user_session(id, token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False

    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid Session,Please Login again'})
    return JsonResponse({'Client Token': gateway.client_token.generate(), 'sucess': True})


@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid Session,Please Login again'})


    try:
        nonce_from_the_client = request.POST.get("paymentMethodNonce")
        print('nonce',nonce_from_the_client)
        # print('Request POST data:', request.POST)


        amount_from_the_client =request.POST.get("amount")
        print('amt',amount_from_the_client)

        result = gateway.transaction.sale({
            "amount": amount_from_the_client,
            "payment_method_nonce": nonce_from_the_client,
            "options": {
                "submit_for_settlement": True
            }
        })

        if result.is_success:
            return JsonResponse({
                "success": True,
                "transaction": {'id': result.transaction.id, "amount": result.transaction.amount}
            })
        else:
            return JsonResponse({'error': True, 'success': False, 'message': result.message})

    except Exception as e:
        return JsonResponse({'error': str(e), 'success': False})
