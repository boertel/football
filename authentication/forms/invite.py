from django import forms
from django.contrib.auth.forms import (
    PasswordResetForm,
    SetPasswordForm,
    _unicode_ci_compare,
)
from django.utils import timezone
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlencode
from django.contrib.auth import get_user_model

from ..tokens import invite_token_generator
from courier import send_email

UserModel = get_user_model()


class InviteForm(PasswordResetForm):
    def get_users(self, email):
        email_field_name = UserModel.get_email_field_name()
        active_users = UserModel._default_manager.filter(
            **{"%s__iexact" % email_field_name: email, "is_active": True}
        )
        # difference with PasswordResetForm is that we want only users
        # who don't have a password
        return (
            u
            for u in active_users
            if not u.has_usable_password()
            and _unicode_ci_compare(email, getattr(u, email_field_name))
        )

    def send_mail(self, user, context={}, **kwargs):
        resend = user.invited_at is not None and user.role == UserModel.Role.MANAGER
        if resend:
            template_name = "resend-invite"
        else:
            template_name = "invite-{}".format(user.role)

        send_email(template_name, user, context)
        user.invited_at = timezone.now()
        user.save()

    def save(self, request, token_generator=invite_token_generator, **kwargs):
        email = self.cleaned_data["email"]
        email_field_name = UserModel.get_email_field_name()
        for user in self.get_users(email):
            user_email = getattr(user, email_field_name)
            query_parameters = urlencode(
                {
                    "token": token_generator.make_token(user),
                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                    "email": user_email,
                }
            )
            cta_href = "{protocol}://{domain}/auth/invite?{query_parameters}".format(
                **{
                    "protocol": request.scheme,
                    "domain": request.get_host(),
                    "query_parameters": query_parameters,
                }
            )
            context = {"cta_href": cta_href}
            self.send_mail(user, context=context)


class InviteConfirmForm(SetPasswordForm):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
