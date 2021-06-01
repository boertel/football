from rest_framework import serializers

from django.contrib.auth import get_user_model

from .password import PasswordResetConfirmSerializer
from .fields import LowercaseEmailField
from ..forms import InviteForm, InviteConfirmForm

UserModel = get_user_model()


class InviteSerializer(serializers.ModelSerializer):
    email = LowercaseEmailField()

    class Meta:
        model = UserModel
        fields = ("email",)

    def validate_email(self, value):
        email = value
        team = self.context.get("team")
        if team:
            manager = team.get_manager()
            domain = manager.email.split("@")[-1]

            if not email.endswith(domain):
                raise serializers.ValidationError(
                    "Email must belong to {}.".format(domain)
                )
            if team.members.filter(email=email).exists():
                raise serializers.ValidationError("Email already invited.")

            if UserModel.objects.filter(email=email).exists():
                raise serializers.ValidationError(
                    "Email already invited to another team."
                )

        return email

    def assign_to_team(self, user):
        team = self.context.get("team")
        if team:
            user.team = team

    def update(self, instance, validated_data):
        # overwriting `save` with many=True doesn't work
        self.assign_to_team(instance)
        user = super().update(instance, validated_data)
        return user

    def create(self, validated_data):
        request = self.context["request"]
        team = self.context["team"]
        if team:
            manager = team.get_manager()
            is_test = manager.is_test
        else:
            is_test = False
        user = UserModel.objects.create_user_as_contributor(
            validated_data["email"], team=team, is_test=is_test
        )
        form = InviteForm(data=validated_data)
        # TODO deal with invite not being sent!
        if form.is_valid():
            form.save(request=request)
        return user


class InviteConfirmSerializer(PasswordResetConfirmSerializer):
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)

    form_class = InviteConfirmForm
