from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.forms import EmailField, CharField as DjangoCharField

from rest_framework import serializers
from rest_framework.serializers import CharField

from .base import DjangoFormSerializer
from .fields import PasswordField, LowercaseEmailField

UserModel = get_user_model()


class UserModelCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        # TODO handle USERNAME_FIELD
        fields = (
            "email",
            "full_name",
        )
        field_classes = {"email": EmailField, "full_name": DjangoCharField}


class RegisterSerializer(DjangoFormSerializer):
    # TODO what if we want to add more fields?
    # Option 1: two api calls registration; 1. /auth/register 2. your own /users/me
    # Option 2: customize this serializer
    email = LowercaseEmailField()
    password1 = PasswordField()
    password2 = PasswordField()
    full_name = CharField()

    form_class = UserModelCreationForm


class RegisterVerifySerializer(serializers.Serializer):
    pass
