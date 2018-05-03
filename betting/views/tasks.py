from datetime import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from betting.models import Game, Bet


class Task(object):
    def __init__(self, model, action, options):
        self.model = model
        self.action = action
        self.options = options


class TaskSerializer(serializers.Serializer):
    model = serializers.CharField()
    action = serializers.CharField()
    options = serializers.DictField()


class TasksView(APIView):
    def get(self, request, format=None):
        now = datetime.utcnow()
        game = Game.objects.filter(start__gte=now).first()
        tasks = []

        tasks.append(Task('game', 'view', {'game_id': game.id}))

        if not request.user.avatar:
            tasks.append(Task('user', 'update', {'avatar': request.user.avatar}))

        if not request.user.verified:
            tasks.append(Task('user', 'update', {'verified': request.user.verified}))

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
