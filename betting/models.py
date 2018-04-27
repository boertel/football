from datetime import datetime, timedelta, timezone

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.URLField(max_length=255)
    friends = models.ManyToManyField('self', symmetrical=False,
                                     through='Relationship',
                                     related_name='friends+')


class Relationship(models.Model):
    user = models.ForeignKey(User, related_name='from_user',
                             on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='to_user',
                                on_delete=models.CASCADE)
    favorite = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)


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

    @property
    def locked(self):
        now = datetime.now(timezone.utc)
        diff = self.start - now
        return diff / timedelta(minutes=1) < 15


class Bet(models.Model):
    score_a = models.IntegerField(null=True)
    score_b = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    validated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
