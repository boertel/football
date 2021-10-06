from django.contrib.auth.forms import PasswordResetForm

from courier.utils import send_email


class PasswordResetFormWithCustomEmail(PasswordResetForm):
    def send_mail(
        self,
        subject_template_name,
        email_template_name,
        context,
        from_email,
        to_email,
        html_email_template_name=None,
    ):
        context[
            "cta_href"
        ] = "{protocol}://{domain}/reset?uid={uid}&token={token}".format(**context)
        send_email("password-reset", to_email, context)
