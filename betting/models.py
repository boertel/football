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
    start = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    points = models.ForeignKey(Points, on_delete=models.CASCADE)


class Competitor(models.Model):
    name = models.CharField(max_length=255)


class Bet(models.Model):
    score_a = models.IntegerField()
    score_b = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    validated = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Game(models.Model):
    order = models.IntegerField()
    start = models.DateTimeField()
    end = models.DateTimeField()
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
    bets = models.ManyToManyField(to=Bet)
