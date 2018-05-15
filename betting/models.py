import hashlib
from datetime import datetime, timedelta, timezone

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.URLField(max_length=255)
    full_name = models.CharField(max_length=255)
    verified = models.BooleanField(default=False)
    points = models.IntegerField(default=0)

    @property
    def gravatar(self):
        return hashlib.md5(self.email.encode('utf-8')).hexdigest()


class Friends(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    members = models.ManyToManyField(User, related_name='members')


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


class Competitor(models.Model):
    name = models.CharField(max_length=255)


class Bet(models.Model):
    score_a = models.IntegerField(null=True)
    score_b = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    validated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class GameManager(models.Manager):
    def next(self, user, limit=1):
        now = datetime.now(timezone.utc)
        my_games = Bet.objects.filter(user=user).values_list('game_id', flat=True)
        games = self.filter(start__gte=now).exclude(id__in=my_games).order_by('order')[:limit]
        return games


class Game(models.Model):
    order = models.IntegerField()
    start = models.DateTimeField()
    score_a = models.IntegerField(null=True)
    score_b = models.IntegerField(null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE,
                              related_name='group')
    competitor_a = models.ForeignKey(Competitor, on_delete=models.CASCADE,
                                     related_name='competitor_a')
    competitor_b = models.ForeignKey(Competitor, on_delete=models.CASCADE,
                                     related_name='competitor_b')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bets = models.ManyToManyField(User, through='Bet')

    objects = GameManager()

    @property
    def locked(self):
        now = datetime.now(timezone.utc)
        diff = self.start - now
        return diff / timedelta(minutes=1) < 15
