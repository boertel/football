from rest_framework import viewsets

from betting.serializers import CompetitorSerializer
from betting.models import Competitor


class CompetitorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competitor.objects.all()
    serializer_class = CompetitorSerializer
