# users/serializers.py
from rest_framework import serializers
from.models import User
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):

    date_joined = serializers.ReadOnlyField()

    class Meta(object):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'date_joined', 'password', 'utorid')
        extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
            user.save()
        return user
