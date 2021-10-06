# Generated by Django 2.0.4 on 2018-05-08 21:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('betting', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friends',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.RemoveField(
            model_name='relationship',
            name='to_user',
        ),
        migrations.RemoveField(
            model_name='relationship',
            name='user',
        ),
        migrations.RemoveField(
            model_name='user',
            name='friends',
        ),
        migrations.DeleteModel(
            name='Relationship',
        ),
        migrations.AddField(
            model_name='friends',
            name='members',
            field=models.ManyToManyField(related_name='members', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='friends',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
        ),
    ]