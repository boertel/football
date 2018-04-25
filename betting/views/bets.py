from rest_framework import viewsets

from betting.serializers import BetSerializer
from betting.models import Bet


class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
