# Generated by Django 3.1b1 on 2020-07-02 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courier", "0002_auto_20200701_2323"),
    ]

    operations = [
        migrations.AddField(
            model_name="email",
            name="signature",
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
