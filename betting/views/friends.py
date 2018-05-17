from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from betting.serializers import ReadOnlyFriendsSerializer, WriteFriendsSerializer
from betting.models import Friends
from betting.permissions import IsOwnerOrReadOnly


class FriendsViewSet(viewsets.ModelViewSet):
    queryset = Friends.objects.all()
    serializer_class = ReadOnlyFriendsSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return ReadOnlyFriendsSerializer
        return WriteFriendsSerializer

    @action(methods=['post'], detail=True)
    def join(self, request, pk):
        friends = self.get_object()
        friends.members.add(self.request.user)
        serializer = self.get_serializer(friends)
        return Response(serializer.data)

    @action(methods=['post'], detail=True)
    def leave(self, request, pk):
        friends = self.get_object()
        friends.members.remove(self.request.user)
        serializer = self.get_serializer(friends)
        return Response(serializer.data)

    def perform_create(self, serializer):
        friends = serializer.save(owner=self.request.user)
        friends.members.add(self.request.user)
        friends.save()
