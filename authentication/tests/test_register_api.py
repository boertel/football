from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class RegistrationTestCase(APITestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        self.register_url = reverse("authentication_register")

    def test_successful_registration(self):
        data = {
            "email": "ben@comediadesign.com",
            "password1": "Bonjour123!",
            "password2": "Bonjour123!",
        }
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = response.json()
        self.assertIn("pk", data)
        data.pop("pk")
        self.assertDictEqual(
            data, {"email": "ben@comediadesign.com", "is_active": True}
        )
        self.assertEqual(User.objects.count(), 1)

    def test_register_twice(self):
        data = {
            "email": "ben@comediadesign.com",
            "password1": "Bonjour123!",
            "password2": "Bonjour123!",
        }
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = response.json()
        self.assertIn("pk", data)
        data.pop("pk")
        self.assertDictEqual(
            data, {"email": "ben@comediadesign.com", "is_active": True}
        )
        self.assertEqual(User.objects.count(), 1)
        data = {
            "email": "ben@comediadesign.com",
            "password1": "AlreadyThere123!",
            "password2": "AlreadyThere123!",
        }
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # TODO not sure we want to expose that
        self.assertDictEqual(
            response.json(),
            {"email": ["User with this Email address already exists."]},
        )

    def test_different_passwords(self):
        data = {
            "email": "ben@comediadesign.com",
            "password1": "Hello123!",
            "password2": "Hola123!",
        }
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(), {"password2": ["The two password fields didn’t match."]}
        )
        self.assertEqual(User.objects.count(), 0)

    def test_wrong_email_address(self):
        data = {
            "email": "bencomediadesign.com",
            "password1": "Bonjour123!",
            "password2": "Bonjour123!",
        }
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(), {"email": ["Enter a valid email address."]}
        )
        self.assertEqual(User.objects.count(), 0)

    def test_password_does_match_requirements(self):
        data = {
            "email": "ben@comediadesign.com",
            "password1": "1234",
            "password2": "1234",
        }
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # this is making sure we are going through form defined in django.contrib.auth
        self.assertDictEqual(
            response.json(),
            {
                "password2": [
                    "This password is too short. It must contain at least 8 characters.",
                    "This password is too common.",
                    "This password is entirely numeric.",
                ]
            },
        )
        self.assertEqual(User.objects.count(), 0)

    def test_unknown_email(self):
        data = {"password1": "1234", "password2": "1234"}
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(response.json(), {"email": ["This field is required."]})
        self.assertEqual(User.objects.count(), 0)

    def test_unknown_password(self):
        data = {"email": "ben@comediadesign.com"}
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(
            response.json(),
            {
                "password1": ["This field is required."],
                "password2": ["This field is required."],
            },
        )
        self.assertEqual(User.objects.count(), 0)

    def test_try_other_methods(self):
        data = {
            "email": "ben@comediadesign.com",
            "password1": "Bonjour123!",
            "password2": "Bonjour123!",
        }
        for method in ["get", "put", "patch"]:
            func = getattr(self.client, method)
            response = func(self.register_url, data=data, format="json")
            self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
            self.assertEqual(User.objects.count(), 0)
