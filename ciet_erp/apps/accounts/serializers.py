from rest_framework import serializers
from apps.accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'is_active']
        read_only_fields = ['id', 'is_active']
