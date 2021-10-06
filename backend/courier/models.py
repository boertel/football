from django.db import models
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template import Template, Context, loader


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Email(BaseModel):
    class Status:
        DRAFT = "draft"
        ACTIVE = "active"
        ARCHIVED = "archived"

        @classmethod
        def as_choices(cls):
            return (
                (cls.DRAFT, "Draft"),
                (cls.ACTIVE, "Active"),
                (cls.ARCHIVED, "Archived"),
            )

    template_name = models.SlugField()
    status = models.CharField(
        max_length=60, choices=Status.as_choices(), default=Status.DRAFT
    )
    from_email = models.CharField(max_length=500, null=True, blank=True)
    subject = models.CharField(max_length=500)
    preheader = models.CharField(max_length=500, null=True, blank=True)
    content = models.TextField()
    cta_content = models.CharField(max_length=500, null=True, blank=True)
    cta_href = models.CharField(max_length=500, null=True, blank=True)
    signature = models.CharField(max_length=500, null=True, blank=True)
    subscription_group = models.CharField(
        max_length=500,
        null=True,
        blank=True,
        help_text="sendgrid subscription group id",
    )

    def render(self, context):
        template = "courier/default.html"
        protocol = "http:" if settings.DEBUG else "https:"
        body_context = {"root_href": "{}//{}".format(protocol, settings.HOST)}
        body_context.update(context)
        cta_href = context.get("cta_href", self.cta_href)
        if self.cta_content:
            if cta_href and cta_href.startswith("/"):
                body_context["cta_href"] = "{}//{}{}".format(
                    protocol, settings.HOST, cta_href
                )
            else:
                body_context["cta_href"] = cta_href
            body_context["cta_content"] = Template(self.cta_content).render(
                Context(body_context)
            )
        if self.preheader:
            body_context["preheader"] = Template(self.preheader).render(
                Context(body_context)
            )

        body_context.update(
            {
                "subject": Template(self.subject).render(Context(body_context)),
                "body": Template(self.content).render(Context(body_context)),
                "show_unsubscribe_link": bool(self.subscription_group),
            }
        )
        if self.signature:
            body_context["signature"] = Template(self.signature).render(
                Context(body_context)
            )

        html = loader.render_to_string(template, body_context)
        return {"subject": body_context["subject"], "body": html, "html_message": html}

    def get_email_message(
        self,
        to,
        context={},
        template=None,
        from_email=None,
        bcc=[],
        connection=None,
        attachments=[],
        headers={},
        cc=[],
        reply_to=[],
    ):
        if type(to) == str:
            to = [to]
        email_kwargs = self.render(context)
        email_message = EmailMultiAlternatives(
            subject=email_kwargs.get("subject"),
            body=email_kwargs.get("body"),
            from_email=from_email,
            to=to,
            bcc=bcc,
            connection=connection,
            attachments=attachments,
            headers=headers,
            cc=cc,
            reply_to=reply_to,
        )
        email_message.tags = [self.template_name]
        email_message.attach_alternative(email_kwargs.get("html_message"), "text/html")
        return email_message

    def send(
        self,
        to,
        context={},
        template=None,
        from_email=None,
        bcc=[],
        connection=None,
        attachments=[],
        headers={},
        cc=[],
        reply_to=[],
        fail_silently=False,
    ):
        """
        Send the email with the template corresponding to `template`
        """
        from_email = self.from_email
        email_message = self.get_email_message(
            to,
            context,
            template,
            from_email,
            bcc,
            connection,
            attachments,
            headers,
            cc,
            reply_to,
        )
        response = email_message.send(fail_silently=fail_silently)
        return response


class EmailActivity(BaseModel):
    to = models.EmailField()
    template_name = models.SlugField()
    once = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Email Activities"
