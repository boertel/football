from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from django.contrib.auth import authenticate, login, logout

from betting.serializers import UserSerializer
from betting.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ()

    @action(methods=['get'], detail=False)
    def me(self, request):
        if request.user:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({'ok': False})

    @action(methods=['post'], detail=False)
    def login(self, request):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response({'ok': False})

    @action(methods=['post'], detail=False)
    def logout(self, request):
        logout(request)
        return Response({'ok': True})

    def create(self, request):
        username = request.data['username']
        password = request.data['password']

        data = {
            'username': username,
            'email': request.data['username'],
            'password': password,
            'full_name': request.data['full_name'],
        }

        user = User.objects.create_user(**data)
        if user:
            return self.login(request)
