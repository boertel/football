from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.forms import EmailField

from rest_framework import serializers

from .base import DjangoFormSerializer
from .fields import PasswordField, LowercaseEmailField

UserModel = get_user_model()


class UserModelCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        # TODO handle USERNAME_FIELD
        fields = ("email",)
        field_classes = {"email": EmailField}


class RegisterSerializer(DjangoFormSerializer):
    # TODO what if we want to add more fields?
    # Option 1: two api calls registration; 1. /auth/register 2. your own /users/me
    # Option 2: customize this serializer
    email = LowercaseEmailField()
    password1 = PasswordField()
    password2 = PasswordField()

    form_class = UserModelCreationForm


class RegisterVerifySerializer(serializers.Serializer):
    pass
