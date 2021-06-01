from rest_framework.serializers import CharField
from rest_framework.serializers import EmailField


class PasswordField(CharField):
    def __init__(self, *args, **kwargs):
        if "style" not in kwargs:
            kwargs["style"] = {"input_type": "password"}
        kwargs["write_only"] = True  # you shouldn't need password as read.
        super().__init__(*args, **kwargs)


class LowercaseEmailField(EmailField):
    def to_internal_value(self, data):
        return data.lower()
