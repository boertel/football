from django.contrib.auth import get_user_model

from rest_framework import serializers

UserModel = get_user_model()


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("id", "email", "is_active")
        read_only_fields = ("email", "is_active")
