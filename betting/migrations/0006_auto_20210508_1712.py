# Generated by Django 3.2.2 on 2021-05-08 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('betting', '0005_competitor_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='competition',
            name='slug',
            field=models.SlugField(default='world-cup-2018'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='game',
            name='venue',
            field=models.CharField(max_length=255, null=True),
        ),
    ]