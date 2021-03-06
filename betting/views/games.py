from datetime import datetime

from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser

from betting.serializers import GameSerializer, BetSerializer
from betting.exceptions import GameLocked
from betting.models import Game, Bet, Competition, UserCompetition
from betting.permissions import IsAdminOrReadOnly


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ("start", "order")
    permissions = (IsAdminOrReadOnly,)

    def get_queryset(self):
        bets = {}
        bets_queryset = Bet.objects.filter(user=self.request.user)
        if "pk" in self.kwargs:
            bets_queryset = bets_queryset.filter(game_id=self.kwargs["pk"])
        for bet in bets_queryset:
            bets[bet.game_id] = bet
        queryset = (
            Game.objects.all()
            .select_related("group")
            .select_related("group__points")
            .select_related("competition")
            .select_related("competitor_a")
            .select_related("competitor_b")
        )
        competition_slug = self.request.query_params.get("competition")
        if competition_slug is not None:
            competition = Competition.objects.get(slug=competition_slug)
            queryset = queryset.filter(competition=competition)
        end_after = self.request.query_params.get("end_after", None)
        if end_after:
            # TODO(boertel) support str => datetime
            if end_after == "now":
                dt_end_after = datetime.utcnow()
            queryset = queryset.filter(end__lte=dt_end_after)
        if "pk" in self.kwargs:
            queryset = queryset.filter(pk=self.kwargs["pk"])
        games = []
        for game in queryset:
            game.bet = bets.get(game.id)
            games.append(game)
        return games

    def get_object(self):
        queryset = self.get_queryset()
        if len(queryset) == 0:
            raise NotFound()
        return queryset[0]

    @action(methods=["post"], detail=True, permissions=[IsAdminUser])
    def compute(self, request, pk=None):
        game = self.get_object()
        ok = game.compute_points()
        return Response({"ok": ok})

    @action(methods=["get", "post", "put"], detail=True)
    def bets(self, request, pk=None):
        game = self.get_object()
        if request.method == "GET":
            if not game.locked:
                raise GameLocked()

            bets = game.bets.all()
            serializer = BetSerializer(bets, many=True)
            return Response(serializer.data)
        if request.method in ["POST", "PUT"]:
            # Can't update your bet 15 minutes before the game starts
            if game.locked:
                # TODO(boertel) use a custom ApiErrorResponse so frontend has a
                # standard format for handling errors
                return Response({"lockdown": True}, status=403)

            bet, created = Bet.objects.get_or_create(game=game, user=request.user)
            UserCompetition.objects.get_or_create(
                user=request.user, competition=game.competition
            )
            updated = False
            if "score_a" in request.data:
                updated = True
                bet.score_a = request.data["score_a"]
            if "score_b" in request.data:
                updated = True
                bet.score_b = request.data["score_b"]
            if updated:
                bet.save()
            serializer = BetSerializer(bet)
            return Response(serializer.data)
