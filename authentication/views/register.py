from rest_framework import status
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from ..serializers import RegisterSerializer, RegisterVerifySerializer, MeSerializer


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    response_serializer_class = MeSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.process_create(serializer)
        response_serializer = self.response_serializer_class(user)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def process_create(self, serializer):
        user = serializer.save(self.request)
        return user


class RegisterVerifyView(GenericAPIView):
    serializer_class = RegisterVerifySerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["key"]
        return Response({}, status=status.HTTP_200_OK)
