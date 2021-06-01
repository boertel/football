from django.conf import settings
from django.core.management.base import BaseCommand

from courier.models import Email


class Command(BaseCommand):
    help = "Set the sendgrid subscription group to the dev value for all courier emails"

    def handle(self, *args, **options):
        if not settings.DEBUG:
            raise AssertionError("Must be DEBUG true environment")

        for email in Email.objects.all():
            email.subscription_group = settings.SENDGRID_SUBSCRIPTION_GROUP_ID
            email.save()
