from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

UserModel = get_user_model()


class DjangoFormSerializer(serializers.Serializer):
    def validate(self, data, **kwargs):
        self.form = self.form_class(data=data, **kwargs)
        if not self.form.is_valid():
            raise ValidationError(self.form.errors)
        return data

    def save(self, *args, **kwargs):
        return self.form.save(*args, **kwargs)
