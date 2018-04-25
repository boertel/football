from hashlib import md5

from rest_framework import serializers

from betting.models import Group, Points, Competitor, Game, User, Bet


class PointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Points
        fields = ('id', 'win', 'perfect', 'loss')


class GroupSerializer(serializers.ModelSerializer):
    points = PointsSerializer(read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'start', 'points',)


class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = ('id', 'name',)


class GameSerializer(serializers.ModelSerializer):
    competitor_a = CompetitorSerializer(read_only=True)
    competitor_b = CompetitorSerializer(read_only=True)
    group = GroupSerializer(read_only=True)

    class Meta:
        model = Game
        fields = ('id', 'start', 'end', 'score_a', 'score_b', 'group',
                  'competitor_a', 'competitor_b', 'order',)


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = ('id', 'user', 'score_a', 'score_b', 'validated',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'avatar', 'first_name', )
