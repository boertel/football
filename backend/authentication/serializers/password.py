from django.contrib.auth.forms import (
    SetPasswordForm,
    PasswordChangeForm,
)
from django.contrib.auth import get_user_model

from rest_framework.exceptions import ValidationError

from .base import DjangoFormSerializer
from .fields import LowercaseEmailField, PasswordField
from ..forms.reset import PasswordResetFormWithCustomEmail

UserModel = get_user_model()


class BasePasswordSerializer(DjangoFormSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = self.context.get("request").user

    def validate(self, data):
        kwargs = {"data": data}
        if self.user.is_anonymous is False:
            kwargs["user"] = self.user
        return super().validate(**kwargs)


class PasswordResetSerializer(BasePasswordSerializer):
    email = LowercaseEmailField()
    form_class = PasswordResetFormWithCustomEmail

    def save(self):
        request = self.context.get("request")
        options = {
            "use_https": request.is_secure(),
            "request": request,
        }
        return super().save(**options)


class PasswordResetConfirmSerializer(BasePasswordSerializer):
    new_password1 = PasswordField(max_length=128)
    new_password2 = PasswordField(max_length=128)

    form_class = SetPasswordForm


class PasswordChangeSerializer(BasePasswordSerializer):
    old_password = PasswordField(max_length=128, required=False)
    new_password1 = PasswordField(max_length=128)
    new_password2 = PasswordField(max_length=128)

    form_class = PasswordChangeForm

    def validate_old_passworld(self, value):
        if self.user.check_password(value) is False:
            raise ValidationError("Invalid password")
        return value
