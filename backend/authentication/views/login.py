from django.contrib.auth import login as django_login

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ..serializers import MeSerializer, LoginSerializer


class LoginView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    response_serializer_class = MeSerializer

    def process_login(self, request):
        user = self.serializer.validated_data["user"]
        django_login(self.request, user)
        return user

    def post(self, request, *args, **kwargs):
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)

        user = self.process_login(request)
        response_serializer = self.response_serializer_class(user)
        return Response(response_serializer.data, status=status.HTTP_200_OK)
