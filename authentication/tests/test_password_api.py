import re
from urllib.parse import parse_qs

from django.core import mail
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


def parse_reset_password_email():
    content = mail.outbox[0].body
    matches = re.search(r'/auth/reset\?(?P<qs>.*?)" ', content)
    query_params = parse_qs(matches.group("qs"))
    return query_params


class PasswordResetTestCase(APITestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        self.login_url = reverse("authentication_login")
        self.password_reset_url = reverse("authentication_password_reset")
        self.password_reset_confirm_url = reverse(
            "authentication_password_reset_confirm"
        )

        self.password = "Bonjour123!"
        self.email = "ben+exist@comediadesign.com"
        self.user = User.objects.create_user(self.email, password=self.password)

    def login(self, email=None, password=None):
        if email is None:
            email = self.email
        if password is None:
            password = self.password
        return self.client.login(email=email, password=password)

    def test_reset_password_successful(self):
        data = {"email": "ben+exist@comediadesign.com"}
        response = self.client.post(self.password_reset_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+exist@comediadesign.com", mail.outbox[0].to)
        self.assertEqual(mail.outbox[0].subject, "Reset your password")
        query_params = parse_reset_password_email()
        confirm_data = {
            "uid": query_params["uid"][0],
            "token": query_params["token"][0],
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        confirm_response = self.client.post(
            self.password_reset_confirm_url, data=confirm_data, format="json"
        )
        self.assertEqual(confirm_response.status_code, status.HTTP_200_OK)
        login_data = {
            "email": "ben+exist@comediadesign.com",
            "password": "MyNewAwesomePassword",
        }
        login_response = self.client.post(
            self.login_url, data=login_data, format="json"
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

    def test_missing_token(self):
        data = {"email": "ben+exist@comediadesign.com"}
        response = self.client.post(self.password_reset_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+exist@comediadesign.com", mail.outbox[0].to)
        self.assertEqual(mail.outbox[0].subject, "Reset your password")
        query_params = parse_reset_password_email()
        confirm_data = {
            "uid": query_params["uid"][0],
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        confirm_response = self.client.post(
            self.password_reset_confirm_url, data=confirm_data, format="json"
        )
        self.assertEqual(confirm_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_reusing_token(self):
        data = {"email": "ben+exist@comediadesign.com"}
        response = self.client.post(self.password_reset_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+exist@comediadesign.com", mail.outbox[0].to)
        self.assertEqual(mail.outbox[0].subject, "Reset your password")
        query_params = parse_reset_password_email()
        confirm_data = {
            "uid": query_params["uid"][0],
            "token": query_params["token"][0],
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        confirm_response = self.client.post(
            self.password_reset_confirm_url, data=confirm_data, format="json"
        )
        self.assertEqual(confirm_response.status_code, status.HTTP_200_OK)
        reuse_response = self.client.post(
            self.password_reset_confirm_url, data=confirm_data, format="json"
        )
        self.assertEqual(reuse_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_wrong_token(self):
        data = {"email": "ben+exist@comediadesign.com"}
        response = self.client.post(self.password_reset_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+exist@comediadesign.com", mail.outbox[0].to)
        self.assertEqual(mail.outbox[0].subject, "Reset your password")
        query_params = parse_reset_password_email()
        confirm_data = {
            "uid": query_params["uid"][0],
            "token": "somerandomcharacterthatishopefullynotavalidtoken",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        confirm_response = self.client.post(
            self.password_reset_confirm_url, data=confirm_data, format="json"
        )
        self.assertEqual(confirm_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_wrong_uid(self):
        data = {"email": "ben+exist@comediadesign.com"}
        response = self.client.post(self.password_reset_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("ben+exist@comediadesign.com", mail.outbox[0].to)
        self.assertEqual(mail.outbox[0].subject, "Reset your password")
        query_params = parse_reset_password_email()
        confirm_data = {
            "uid": "ABCDEF",
            "token": query_params["token"][0],
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        confirm_response = self.client.post(
            self.password_reset_confirm_url, data=confirm_data, format="json"
        )
        self.assertEqual(confirm_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_has_unusable_password(self):
        new_user = User.objects.create_user("ben+new@comediadesign.com")
        self.assertFalse(new_user.has_usable_password())
        data = {"email": "ben+new@comediadesign.com"}
        response = self.client.post(self.password_reset_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Django doesn't send an email if the user didn't set up a password in
        # the first place
        self.assertEqual(len(mail.outbox), 0)


class PasswordChangeTestCase(APITestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        self.login_url = reverse("authentication_login")
        self.password_change_url = reverse("authentication_password_change")
        self.password = "Bonjour123!"
        self.email = "ben+exist@comediadesign.com"
        self.user = User.objects.create_user(self.email, password=self.password)

    def login(self, email=None, password=None):
        if email is None:
            email = self.email
        if password is None:
            password = self.password
        return self.client.login(email=email, password=password)

    def test_password_change_successful(self):
        self.login()
        data = {
            "old_password": "Bonjour123!",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        response = self.client.post(self.password_change_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.logout()

        login_data = {
            "email": "ben+exist@comediadesign.com",
            "password": "MyNewAwesomePassword",
        }
        login_response = self.client.post(
            self.login_url, data=login_data, format="json"
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

    def test_wrong_old_password(self):
        self.login()
        data = {
            "old_password": "WrongPassword!",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        response = self.client.post(self.password_change_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {
                "old_password": [
                    "Your old password was entered incorrectly. Please enter it again."
                ]
            },
        )

    def test_different_new_passwords(self):
        self.login()
        data = {
            "old_password": "Bonjour123!",
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "NewMoreAwesomePassword",
        }
        response = self.client.post(self.password_change_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {"new_password2": ["The two password fields didn’t match."]},
        )

    def test_empty_new_password(self):
        self.login()
        data = {"old_password": "Bonjour123!", "new_password1": "", "new_password2": ""}
        response = self.client.post(self.password_change_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {
                "new_password1": ["This field may not be blank."],
                "new_password2": ["This field may not be blank."],
            },
        )

    def test_authentication_required(self):
        data = {
            "new_password1": "MyNewAwesomePassword",
            "new_password2": "MyNewAwesomePassword",
        }
        response = self.client.post(
            reverse("authentication_password_change"), data=data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
