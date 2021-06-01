from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import (
    default_token_generator,
)
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.encoding import force_text

from rest_framework.authentication import (
    BaseAuthentication,
    SessionAuthentication as DRFSessionAuthentication,
)

from .tokens import invite_token_generator

UserModel = get_user_model()


class SessionAuthentication(DRFSessionAuthentication):
    def authenticate_header(self, request):
        return "session"


class ResetTokenAuthentication(BaseAuthentication):
    token_generator = default_token_generator

    def authenticate(self, request):
        try:
            uid = force_text(uid_decoder(request.data["uid"]))
            user = UserModel._default_manager.get(pk=uid)
            if not self.token_generator.check_token(user, request.data["token"]):
                return None
            return (user, None)
        except Exception:
            return None


class InviteTokenAuthentication(ResetTokenAuthentication):
    token_generator = invite_token_generator

    def authenticate(self, request):
        output = super().authenticate(request)
        if output:
            user = output[0]
            # TODO It might be an issue, if OAuth comes into play, and we
            # create `User` without password
            # if running and developing Cypress onboarding.test.js you might
            # want to _always_ `return output` without having to re-generate
            # invites tokens
            if user.last_login is None and user.has_usable_password() is False:
                return output
        return None
