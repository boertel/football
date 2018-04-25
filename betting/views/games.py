from datetime import datetime

from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action

from betting.serializers import GameSerializer, BetSerializer
from betting.models import Game


class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('start', 'order')

    def get_queryset(self):
        queryset = Game.objects.all()
        end_after = self.request.query_params.get('end_after', None)
        if end_after:
            # TODO(boertel) support str => datetime
            if end_after == 'now':
                dt_end_after = datetime.utcnow()
            queryset = queryset.filter(end__lte=dt_end_after)
        return queryset

    @action(detail=True)
    def bets(self, request, pk=None):
        game = self.get_object()
        bets = game.bets.all()
        serializer = BetSerializer(bets, many=True)
        return Response(serializer.data)
