from django.contrib.auth import get_user_model, authenticate

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .fields import LowercaseEmailField, PasswordField

UserModel = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = LowercaseEmailField(required=True)
    password = PasswordField()

    def validate(self, data):
        username_field = UserModel.USERNAME_FIELD
        username_value = data.get(username_field)
        password = data["password"]

        kwargs = {"password": password, username_field: username_value}
        user = authenticate(**kwargs)

        if user:
            if not user.is_active:
                raise ValidationError("user account is not active.")
            if hasattr(user, "is_verified") and not user.is_verified:
                raise ValidationError("user account needs to be verified.")
        else:
            raise ValidationError("Unable to log in with provided credentials")

        data["user"] = user
        return data
