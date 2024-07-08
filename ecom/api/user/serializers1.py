from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes,permission_classes
from .models import CustomUser
from django.contrib.auth import update_session_auth_hash

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only = True) 
    def create(self, validated_data):
        password=validated_data.pop('password',None)
        instance=self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr,value in validated_data:
            if attr=='password':
                instance.set_password(value)
            else:
                setattr(instance,attr,value)
            
        instance.save()
        return instance
    
    class Meta:
        model=CustomUser
        extra_kwargs = {'password': {'write_only': True}}
        fields=('name','email','password','phone','gender','is_active','is_staff','is_superuser')



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, data):
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        user = self.context['request'].user

        if not user.check_password(old_password):
            raise serializers.ValidationError({'error': 'Incorrect old password.'})

        # Perform password change
        user.set_password(new_password)
        user.save()

        # To update session after password change
        update_session_auth_hash(self.context['request'], user)

        return data
    
    class Meta:
        model=CustomUser
        fields=('Old Password','New Password')

class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)