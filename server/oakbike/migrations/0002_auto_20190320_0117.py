# Generated by Django 2.1 on 2019-03-20 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oakbike', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='contact',
            field=models.CharField(blank=True, max_length=256),
        ),
        migrations.AddField(
            model_name='report',
            name='description',
            field=models.CharField(blank=True, max_length=512),
        ),
    ]
