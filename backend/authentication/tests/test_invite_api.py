from django.urls import reverse
from django.contrib.auth import get_user_model
from django.core import mail

from rest_framework import status
from rest_framework.test import APITestCase

from risingteam.models import Team
from billing.models import Account

User = get_user_model()


class InviteTestCase(APITestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        self.email = "ben+manager@comediadesign.com"
        self.password = "Bonjour123!"
        self.manager = User.objects.create_user_as_manager(
            self.email,
            password=self.password,
        )
        account = Account.objects.create_with_owner(self.manager)
        team = Team.objects.create(name="Test Team", account=account)
        self.manager.team = team
        self.manager.save()
        self.invite_url = reverse("authentication_invite")

    def login(self, email=None, password=None):
        if email is None:
            email = self.email
        if password is None:
            password = self.password
        self.client.login(email=email, password=password)
        mail.outbox = []

    def test_invite_successful(self):
        self.login()
        data = [{"email": "ben+guest1@comediadesign.com"}]
        response = self.client.post(self.invite_url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertListEqual(response.json(), data)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+guest1@comediadesign.com", mail.outbox[0].to)
        self.assertIn("Invite to join Rising Team from", mail.outbox[0].subject)

        mail.outbox = []

        invite_more_data = [
            {"email": "ben+guest2@comediadesign.com"},
            {"email": "ben+guest3@comediadesign.com"},
        ]
        invite_more_response = self.client.post(
            self.invite_url, invite_more_data, format="json"
        )
        self.assertEqual(invite_more_response.status_code, 201)
        self.assertListEqual(invite_more_response.json(), invite_more_data)
        self.assertEqual(User.objects.count(), 4)
        self.assertEqual(len(mail.outbox), 2)
        for index, d in enumerate(invite_more_data):
            self.assertIn(d["email"], mail.outbox[index].to)
            self.assertIn("Invite to join Rising Team from", mail.outbox[index].subject)
            index += 1

    def test_with_user_already_invited(self):
        self.login()
        data = [{"email": "ben+guest-already@comediadesign.com"}]
        response = self.client.post(self.invite_url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertListEqual(response.json(), data)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+guest-already@comediadesign.com", mail.outbox[0].to)
        self.assertIn("Invite to join Rising Team from", mail.outbox[0].subject)

        mail.outbox = []

        already_data = [{"email": "ben+guest-already@comediadesign.com"}]
        response = self.client.post(self.invite_url, already_data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(len(mail.outbox), 0)


class InviteConfirmTestCase(APITestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        self.invite_confirm_url = reverse("authentication_invite_confirm")
        self.login_url = reverse("authentication_login")

    def test_invite_successful(self):
        guest = User.objects.create_user("ben+guest@comediadesign.com", invited_at=True)
        self.assertFalse(guest.has_usable_password())
        self.assertIsNotNone(guest.invited_at)
        self.assertIsNone(guest.last_login)
        token = guest.generate_invite_token()
        data = {
            "uid": token["uid"],
            "token": token["token"],
            "email": "ben+guest@comediadesign.com",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        response = self.client.post(self.invite_confirm_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        login_data = {
            "email": "ben+guest@comediadesign.com",
            "password": "MyNewAwesomePassword",
        }
        login_response = self.client.post(self.login_url, data=login_data)
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        guest.refresh_from_db()
        self.assertIsNotNone(guest.invited_at)
        self.assertIsNotNone(guest.last_login)

    def test_wrong_passwords(self):
        guest = User.objects.create_user("ben+guest@comediadesign.com", invited_at=True)
        self.assertFalse(guest.has_usable_password())
        self.assertIsNotNone(guest.invited_at)
        self.assertIsNone(guest.last_login)
        token = guest.generate_invite_token()
        data = {
            "uid": token["uid"],
            "token": token["token"],
            "email": "ben+guest@comediadesign.com",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "AndIAmTypingSomethingElseHere",
        }
        response = self.client.post(self.invite_confirm_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {"new_password2": ["The two password fields didn’t match."]},
        )

        data["new_password2"] = data["new_password1"]
        retry_response = self.client.post(self.invite_confirm_url, data=data)
        self.assertEqual(retry_response.status_code, status.HTTP_200_OK)

    def test_cannot_set_password_if_logged_in_before(self):
        existing_user = User.objects.create_user(
            "ben+existing@comediadesign.com", password="Bonjour123!", invited_at=True
        )
        self.assertTrue(existing_user.has_usable_password())
        self.assertIsNotNone(existing_user.invited_at)
        self.assertIsNone(existing_user.last_login)
        login_data = {
            "email": "ben+existing@comediadesign.com",
            "password": "Bonjour123!",
        }
        login_response = self.client.post(self.login_url, data=login_data)
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        existing_user.refresh_from_db()
        self.assertIsNotNone(existing_user.invited_at)
        self.assertIsNotNone(existing_user.last_login)
        # TODO should I even allow to call this method?
        token = existing_user.generate_invite_token()
        data = {
            "uid": token["uid"],
            "token": token["token"],
            "email": "ben+existing@comediadesign.com",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        response = self.client.post(self.invite_confirm_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
