import logging

from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)


def send_email(template_name, to, context={}, once=None):
    from .models import Email, EmailActivity

    if template_name is None:
        return

    UserModel = get_user_model()

    should_send = True
    if isinstance(to, UserModel):
        should_send = to.is_active
        user = to
        if "member" not in context:
            context["member"] = user
        if (
            "manager" not in context
            and user.team
            and user.role == UserModel.Role.CONTRIBUTOR
        ):
            context["manager"] = user.team.get_manager()
        to = to.email

    email = Email.objects.filter(
        template_name=template_name, status=Email.Status.ACTIVE
    ).first()
    if email and to is not None and should_send is True:
        if once:
            if once is True:
                once = template_name
            already_sent = EmailActivity.objects.filter(to=to, once=once).exists()
            logger.info(
                "sent={sent} template_name={template_name} to={to} once={once}".format(
                    template_name=template_name,
                    to=to,
                    sent=already_sent is False,
                    once=once,
                )
            )
            if already_sent is False:
                email.send(to=to, context=context)
                EmailActivity.objects.create(
                    to=to, template_name=template_name, once=once
                )
        else:
            email.send(to=to, context=context)
    else:
        pass
        # print("{} not found".format(template_name))
    return email
