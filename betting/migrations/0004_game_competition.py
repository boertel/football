# Generated by Django 3.2.2 on 2021-05-07 17:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('betting', '0003_auto_20210507_1754'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='competition',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='betting.competition'),
            preserve_default=False,
        ),
    ]
