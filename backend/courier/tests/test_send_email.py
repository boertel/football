from django.test import TestCase
from django.core import mail

from ..models import Email
from ..utils import send_email
from risingteam.models import User


class SendEmailTestCase(TestCase):
    fixtures = ["wizards.json", "groups.json", "courier.json"]

    def setUp(self):
        content = "Hola!"
        Email.objects.create(
            template_name="test-email",
            status=Email.Status.ACTIVE,
            subject="This is a test email",
            content=content,
        )

        self.user = User.objects.create(email="ben+testuser@comediadesign.com")

    def test_send_to_email_address_directly(self):
        send_email("test-email", to="ben+test-directly@comediadesign.com")
        self.assertEquals(len(mail.outbox), 1)

    def test_send_to_user(self):
        send_email("test-email", to=self.user)
        self.assertEquals(len(mail.outbox), 1)

    def test_dont_send_to_inactive_user(self):
        self.user.is_active = False
        self.user.save()
        send_email("test-email", to=self.user)
        self.assertEquals(len(mail.outbox), 0)
