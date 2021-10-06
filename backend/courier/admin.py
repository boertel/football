from django.contrib import admin


from .forms import EmailForm
from .models import Email, EmailActivity


def make_active(modeladmin, request, queryset):
    queryset.update(status=Email.Status.ACTIVE)


make_active.short_description = "Mark selected emails as active"


@admin.register(EmailActivity)
class EmailActivityAdmin(admin.ModelAdmin):
    model = EmailActivity
    list_display = ("to", "template_name", "once", "created_at")
    search_fields = ("to", "template_name", "once")


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    model = Email
    list_display = ("subject", "template_name", "status")
    list_filter = ("status",)
    actions = [make_active]

    form = EmailForm
