from django import forms
from django.conf import settings


class ListTextWidget(forms.TextInput):
    def __init__(self, data_list, name, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._name = name
        self._list = data_list
        self.attrs.update({"list": "list__%s" % self._name})

    def render(self, name, value, attrs=None, renderer=None):
        attrs.update({"style": "width: 20em"})
        text_html = super().render(name, value, attrs=attrs)
        data_list = '<datalist id="list__{}">'.format(self._name)
        for item in self._list:
            data_list += '<option value="%s">' % item
        data_list += "</datalist>"

        return text_html + data_list


default_from_emails = [
    "{} (default)".format(settings.DEFAULT_FROM_EMAIL),
    "support@risingteam.com",
    "Rising Team <hello@risingteam.com>",
    "Jen at Rising Team <jen@risingteam.com>",
]

default_signatures = [
    "Thanks,<br />Rising Team HQ",
    "Thanks,<br />Jennifer Dulski<br />Founder and CEO",
    " ",
]


class EmailForm(forms.ModelForm):
    from_email = forms.CharField()
    signature = forms.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["from_email"].widget = ListTextWidget(
            data_list=default_from_emails, name="from_email"
        )
        self.fields["signature"].widget = ListTextWidget(
            data_list=default_signatures, name="signature"
        )
