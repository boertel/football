# Generated by Django 3.1 on 2020-12-16 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("courier", "0007_auto_20200909_1712"),
    ]

    operations = [
        migrations.AddField(
            model_name="email",
            name="subscription_group",
            field=models.CharField(
                blank=True,
                default="21870",
                help_text="sendgrid subscription group id",
                max_length=500,
                null=True,
            ),
        ),
    ]
