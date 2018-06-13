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
    def leaderboard(self, request):
        users = self.get_queryset().order_by('points', 'full_name')
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def me(self, request):
        if request.user and request.user.is_authenticated:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({'ok': False})

    @action(methods=['post'], detail=False)
    def login(self, request):
        username = request.data['username'].lower()
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
        full_name = request.data['full_name']

        data = {
            'username': username,
            'email': request.data['username'],
            'password': password,
            'full_name': full_name,
        }

        username_exist = User.objects.filter(username=username).exists()
        fullname_exist = User.objects.filter(full_name=full_name).exists()
        errors = {}
        if username_exist:
            errors['username'] = 'Email Address already exists.'
        if fullname_exist:
            errors['full_name'] = 'Full name already taken.'

        if errors != {}:
            return Response(errors, status=400)

        user = User.objects.create_user(**data)
        if user:
            return self.login(request)
