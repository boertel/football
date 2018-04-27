from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from betting.serializers import GroupSerializer
from betting.models import Group


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticated,)
