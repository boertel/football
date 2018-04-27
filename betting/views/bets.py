from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from betting.serializers import BetSerializer, BetWithUserSerializer, BetWithGameSerializer
from betting.models import Bet, Game


class BetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        gameId = self.request.query_params.get('game', None)
        userId = self.request.query_params.get('user', None)
        if gameId is not None and userId is not None:
            # shouldn't be use really
            return BetSerializer
        if gameId is not None:
            return BetWithUserSerializer
        if userId is not None:
            return BetWithGameSerializer

    def get_queryset(self):
        gameId = self.request.query_params.get('game', None)
        userId = self.request.query_params.get('user', None)

        if gameId is None and userId is None:
            raise PermissionDenied('you need to filter with user and/or game.')

        filters = {}
        if gameId:
            filters['game'] = Game.objects.get(pk=gameId)

        if userId:
            if userId == 'me':
                userId = self.request.user.id
            if 'game' in filters:
                if not filters['game'].locked and userId:
                    userId = self.request.user.id
            filters['user__id'] = userId

        return Bet.objects.filter(**filters)
