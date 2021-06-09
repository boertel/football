from rest_framework import viewsets

from betting.serializers import CompetitionSerializer
from betting.models import Competition


class CompetitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
