from django.contrib.auth import (
    login as django_login,
    authenticate as django_authenticate,
)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from ..serializers import InviteConfirmSerializer, InviteSerializer
from ..authentications import InviteTokenAuthentication
from ..views import PasswordResetConfirmView


class BulkCreateAPIView(CreateAPIView):
    def create(self, request, *args, **kwargs):
        if isinstance(self.request.data, list):
            serializer = self.get_serializer(
                data=request.data, many=True, context=self.get_context(request)
            )
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class InviteView(BulkCreateAPIView):
    """
    1. create a user with at least:
        - an email
        - unusable password
        - for rising team, it will be associate with a team
    2. send a invite

    Also the API should support batching calls
    """

    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = InviteSerializer

    def get_context(self, request):
        return {"team": request.user.team, "request": request}


class InviteConfirmView(PasswordResetConfirmView):
    authentication_classes = (InviteTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = InviteConfirmSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        django_authenticate(
            email=self.request.user.email, password=request.data["new_password1"]
        )
        # TODO not sure if this is good but we need to authenticate with
        # ModelBackend in order to persist sessionid
        django_login(
            request,
            self.request.user,
            backend="django.contrib.auth.backends.ModelBackend",
        )
        return response
