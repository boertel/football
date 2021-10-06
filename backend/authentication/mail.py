from django.template import loader
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


def send_mail(
    to_email,
    subject_template_name,
    email_template_name,
    html_email_template_name=None,
    categories=None,
    context={},
    from_email=settings.DEFAULT_FROM_EMAIL,
):
    context.update(
        {"protocol": "http" if settings.DEBUG else "https", "domain": settings.HOST}
    )
    subject = loader.render_to_string(subject_template_name, context)
    # Email subject *must not* contain newlines
    subject = "".join(subject.splitlines())
    body = loader.render_to_string(email_template_name, context)
    email_message = EmailMultiAlternatives(subject, body, from_email, [to_email])
    if categories is not None:
        email_message.categories = categories
    if html_email_template_name is not None or email_template_name.endswith(".html"):
        html_email = loader.render_to_string(
            html_email_template_name or email_template_name, context
        )
        email_message.attach_alternative(html_email, "text/html")
    email_message.send()


def send_welcome_email(user):
    context = {"email": user.email, "first_name": user.first_name}
    send_mail(
        to_email=user.email,
        subject_template_name="authentication/emails/welcome/subject.txt",
        email_template_name="authentication/emails/welcome/content.html",
        context=context,
        categories=["welcome"],
    )
