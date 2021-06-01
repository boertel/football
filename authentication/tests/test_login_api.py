from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class LoginTestCase(APITestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        self.login_url = reverse("authentication_login")
        self.logout_url = reverse("authentication_logout")
        self.me_url = reverse("authentication_me")
        self.user = User.objects.create_user(
            "ben+exist@comediadesign.com", password="Bonjour123!"
        )

    def tearDown(self):
        self.user.delete()

    def test_login_logout_successful(self):
        data = {"email": "ben+exist@comediadesign.com", "password": "Bonjour123!"}
        response = self.client.post(self.login_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        logout_response = self.client.post(self.logout_url, format="json")
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        me_response = self.client.get(self.me_url, format="json")
        self.assertEqual(me_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_wrong_password(self):
        data = {"email": "ben+exist@comediadesign.com", "password": "WRONGPASSWORD!"}
        response = self.client.post(self.login_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {"non_field_errors": ["Unable to log in with provided credentials"]},
        )

    def test_unknown_email(self):
        data = {"email": "ben@comediadesign.com", "password": "Bonjour123!"}
        response = self.client.post(self.login_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {"non_field_errors": ["Unable to log in with provided credentials"]},
        )

    def test_missing_password_field(self):
        data = {"email": "ben@comediadesign.com"}
        response = self.client.post(self.login_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(response.json(), {"password": ["This field is required."]})

    def test_missing_email_field(self):
        data = {"password": "randompasswordd"}
        response = self.client.post(self.login_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(response.json(), {"email": ["This field is required."]})

    def test_try_other_methods(self):
        data = {"email": "ben+exist@comediadesign.com", "password": "Bonjour123!"}
        for method in ["get", "put", "patch"]:
            func = getattr(self.client, method)
            response = func(self.login_url, data=data, format="json")
            self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
