from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from betting.serializers import UserSerializer
from betting.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ()

    @action(methods=["get"], detail=False)
    def me(self, request):
        if request.user and request.user.is_authenticated:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({"ok": False})
