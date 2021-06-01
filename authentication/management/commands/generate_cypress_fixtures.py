import json
from uuid import uuid4

from django.core.management.base import BaseCommand
from django.utils import timezone

from risingteam.models import User, Team, Profile
from billing.models import Account


def serializer_user(user, password=None):
    output = {
        "email": user.email,
        "validInvite": user.generate_invite_token(),
    }
    if user.team:
        output["team"] = user.team.name
    if password:
        output["password"] = password
    return output


def generate_email(email, prefix):
    return "{}+{}{}@{}".format(email[0], prefix, uuid4(), email[1])


class Command(BaseCommand):
    help = "Create data and generate a json file to be used by Cypress"

    def add_arguments(self, parser):
        parser.add_argument("email")
        parser.add_argument("password")

    def handle(self, *args, **options):
        password = options["password"]
        dev_email = options["email"].split("@")

        new_managers = []
        for idx in range(0, 5):
            new_managers.append(
                User.objects.create_user_as_manager(
                    generate_email(dev_email, "m"),
                    is_test=True,
                )
            )

        existing_managers = []
        new_ics = []
        for idx in range(0, 5):
            existing_manager = User.objects.create_user_as_manager(
                generate_email(dev_email, "m"),
                password=password,
                first_name="Existing",
                last_name="Manager",
                is_test=True,
            )
            account = Account.objects.create_with_owner(existing_manager)
            team = Team.objects.create(
                name="Cypress Team {}".format(idx), account=account
            )
            existing_manager.team = team
            existing_manager.onboarded_at = timezone.now()
            existing_manager.save()

            Profile.objects.create(rt_support="no guidance", user=existing_manager)
            existing_managers.append(existing_manager)
            new_ics.append(
                User.objects.create_user_as_contributor(
                    generate_email(dev_email, "ic"),
                    team=team,
                    is_test=True,
                )
            )

        output = {
            "invites": {
                "managers": [serializer_user(manager) for manager in new_managers],
                "ics": [serializer_user(ic) for ic in new_ics],
            },
            "users": {"manager": serializer_user(existing_managers[0], password)},
        }

        print(json.dumps(output, indent=2))
