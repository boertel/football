from collections import defaultdict
import hashlib
from datetime import datetime, timedelta, timezone

from django.utils import timezone
from django.db.models import Avg, Count, Min, Sum
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.URLField(max_length=255)
    email = models.EmailField("email address", unique=True)
    full_name = models.CharField(max_length=255)
    verified = models.BooleanField(default=False)
    points = models.IntegerField(default=0)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    @property
    def gravatar(self):
        return hashlib.md5(self.email.encode("utf-8")).hexdigest()


class Friends(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    members = models.ManyToManyField(User, related_name="members")


class UserCompetition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    competition = models.ForeignKey("Competition", on_delete=models.CASCADE)
    points = models.IntegerField(default=0)

    def compute_points(self):
        points = 0
        now = timezone.now()
        bets = Bet.objects.filter(
            user_id=self.user_id,
            game__competition_id=self.competition_id,
            game__start__lte=now,
        )
        for bet in bets:
            points += bet.points()
        return points


class Competition(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    users = models.ManyToManyField(User, through=UserCompetition)


class Badge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    @classmethod
    def best_group_results(cls, group):
        bets = Bet.objects.filter(game__group=group, validated=True).select_related(
            "game"
        )
        group_by = defaultdict(int)
        for bet in bets:
            group_by[bet.user_id] += bet.points()
        sort = sorted(group_by.items(), key=lambda item: -item[1])
        return sort

    @classmethod
    def most_perfects(cls, competition):
        bets = Bet.objects.filter(
            game__competition=competition, validated=True
        ).select_related("game")
        group_by = defaultdict(int)
        for bet in bets:
            if bet.score_a == bet.game.score_a and bet.score_b == bet.game.score_b:
                group_by[bet.user_id] += 1
        sort = sorted(group_by.items(), key=lambda item: -item[1])
        return sort

    @classmethod
    def most_wins(cls, competition):
        bets = Bet.objects.filter(
            game__competition=competition, validated=True
        ).select_related("game")
        group_by = defaultdict(int)
        for bet in bets:
            # TODO have a function to compute that
            if bet.score_a == bet.game.score_a and bet.score_b == bet.game.score_b:
                group_by[bet.user_id] += 1
        sort = sorted(group_by.items(), key=lambda item: -item[1])
        return sort


class Points(models.Model):
    perfect = models.IntegerField()
    win = models.IntegerField()
    loss = models.IntegerField()


class Group(models.Model):
    name = models.CharField(max_length=255)
    start = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    points = models.ForeignKey(Points, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, null=True)


class Competitor(models.Model):
    name = models.CharField(max_length=255)


class Bet(models.Model):
    score_a = models.IntegerField(null=True)
    score_b = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey("Game", on_delete=models.CASCADE)
    validated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def points(self, points=None):
        game = self.game
        group = game.group
        if points is None:
            points = group.points
        if game.score_a == self.score_a and game.score_b == self.score_b:
            return points.perfect
        else:
            if (
                game.score_a > game.score_b
                and self.score_a > self.score_b
                or game.score_a == game.score_b
                and self.score_a == self.score_b
                or game.score_a < game.score_b
                and self.score_a < self.score_b
            ):
                return group.points.win
            else:
                return group.points.loss
        return None


class GameManager(models.Manager):
    def next(self, user, limit=1):
        now = datetime.now(timezone.utc)
        my_games = Bet.objects.filter(user=user).values_list("game_id", flat=True)
        games = (
            self.filter(start__gte=now)
            .exclude(id__in=my_games)
            .order_by("order")[:limit]
        )
        return games


class Game(models.Model):
    order = models.IntegerField()
    start = models.DateTimeField()
    score_a = models.IntegerField(null=True)
    score_b = models.IntegerField(null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="group")
    competitor_a = models.ForeignKey(
        Competitor, on_delete=models.CASCADE, related_name="competitor_a"
    )
    competitor_b = models.ForeignKey(
        Competitor, on_delete=models.CASCADE, related_name="competitor_b"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bets = models.ManyToManyField(User, through="Bet")
    venue = models.CharField(max_length=255, null=True)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)

    objects = GameManager()

    def __str__(self):
        return f"Game object ({self.id}) ({self.competitor_a.name} vs. {self.competitor_b.name})"

    def compute_points(self):
        from betting.tasks import update_points

        if self.score_a is not None and self.score_b is not None:
            update_points(self.id)
            return True
        return False

    @property
    def locked(self):
        now = datetime.now(timezone.utc)
        diff = self.start - now
        return diff / timedelta(minutes=1) < 15
