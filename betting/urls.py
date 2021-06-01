from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
from betting import views

router = DefaultRouter()
router.register(r"groups", views.GroupViewSet)
router.register(r"competitors", views.CompetitorViewSet)
router.register(r"games", views.GameViewSet)
router.register(r"users", views.UserViewSet)
router.register(r"bets", views.BetViewSet)
router.register(r"friends", views.FriendsViewSet)

urlpatterns = [
    re_path(r"^", include(router.urls)),
]
