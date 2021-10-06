from rest_framework import serializers

from betting.models import (
    Group,
    Points,
    Competitor,
    Game,
    User,
    Bet,
    Friends,
    Competition,
    UserCompetition,
)


class PointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Points
        fields = ("id", "win", "perfect", "loss")


class GroupSerializer(serializers.ModelSerializer):
    points = PointsSerializer(read_only=True)

    class Meta:
        model = Group
        fields = (
            "id",
            "name",
            "start",
            "points",
        )


class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = (
            "id",
            "name",
        )


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = (
            "id",
            "name",
            "slug",
        )


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = (
            "id",
            "user",
            "game",
            "score_a",
            "score_b",
            "validated",
        )


class GameSerializer(serializers.ModelSerializer):
    competitor_a = CompetitorSerializer(read_only=True)
    competitor_b = CompetitorSerializer(read_only=True)
    competition = CompetitionSerializer(read_only=True)
    group = GroupSerializer(read_only=True)
    bet = BetSerializer(read_only=True)

    class Meta:
        model = Game
        fields = (
            "id",
            "start",
            "score_a",
            "score_b",
            "group",
            "competitor_a",
            "competitor_b",
            "order",
            "locked",
            "bet",
            "venue",
            "competition",
        )


class CompetitionUserSerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField(source="competition.slug")
    name = serializers.ReadOnlyField(source="competition.name")

    class Meta:
        model = UserCompetition
        fields = ("points", "slug", "name")


class UserSerializer(serializers.ModelSerializer):
    competitions = CompetitionUserSerializer(source="usercompetition_set", many=True)

    class Meta:
        model = User
        fields = (
            "id",
            "avatar",
            "full_name",
            "verified",
            "gravatar",
            "is_superuser",
            "competitions",
        )


class BetWithGameSerializer(serializers.ModelSerializer):
    game = GameSerializer(read_only=True)

    class Meta:
        model = Bet
        fields = (
            "id",
            "user",
            "game",
            "score_a",
            "score_b",
            "validated",
        )


class BetWithUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bet
        fields = (
            "id",
            "user",
            "game",
            "score_a",
            "score_b",
            "validated",
        )


class ReadOnlyFriendsSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = UserSerializer(many=True)

    class Meta:
        model = Friends
        fields = (
            "id",
            "owner",
            "name",
            "members",
        )


class WriteFriendsSerializer(ReadOnlyFriendsSerializer):
    members = serializers.PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=User.objects.all()
    )

    class Meta(ReadOnlyFriendsSerializer.Meta):
        pass
