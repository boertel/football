from django.urls import path, re_path
from django.http import Http404

from .views import (
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordChangeView,
    LoginView,
    LogoutView,
    MeView,
    RegisterView,
    RegisterVerifyView,
    InviteConfirmView,
    InviteView,
)

urlpatterns = [
    path(
        "password/reset/",
        PasswordResetView.as_view(),
        name="authentication_password_reset",
    ),
    path(
        "password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="authentication_password_reset_confirm",
    ),
    path(
        "password/change/",
        PasswordChangeView.as_view(),
        name="authentication_password_change",
    ),
    path("login/", LoginView.as_view(), name="authentication_login"),
    path("logout/", LogoutView.as_view(), name="authentication_logout"),
    path("me/", MeView.as_view(), name="authentication_me"),
    path(
        "register/verify",
        RegisterVerifyView.as_view(),
        name="authentication_register_verify",
    ),
    path(
        "invite/confirm/",
        InviteConfirmView.as_view(),
        name="authentication_invite_confirm",
    ),
    path("invite/", InviteView.as_view(), name="authentication_invite"),
]


def not_found(request):
    raise Http404()


# if settings.DEBUG:
urlpatterns += [
    path("register/", RegisterView.as_view(), name="authentication_register"),
    re_path(r"^.*$", not_found),
]
