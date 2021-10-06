from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from ..serializers import (
    PasswordResetSerializer,
    PasswordResetConfirmSerializer,
    PasswordChangeSerializer,
)
from ..authentications import ResetTokenAuthentication


class BasePasswordView(GenericAPIView):
    def get_response_message(self):
        return {}

    def post(self, request, *args, **kwargs):
        context = {
            "request": request,
        }
        if self.request.user and self.request.user.is_anonymous is False:
            context.update({"user": self.request.user})
        serializer = self.get_serializer(data=request.data, context=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(self.get_response_message(), status=status.HTTP_200_OK)


class PasswordResetView(BasePasswordView):
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny,)


class PasswordResetConfirmView(BasePasswordView):
    serializer_class = PasswordResetConfirmSerializer
    authentication_classes = (ResetTokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class PasswordChangeView(BasePasswordView):
    serializer_class = PasswordChangeSerializer
    permission_classes = (IsAuthenticated,)
