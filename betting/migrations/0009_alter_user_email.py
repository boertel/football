# Generated by Django 3.2.2 on 2021-05-20 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('betting', '0008_remove_competitor_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='email address'),
        ),
    ]