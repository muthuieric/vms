# Generated by Django 4.2.8 on 2024-01-25 11:32

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="useraccount",
            name="role",
            field=models.CharField(default="user", max_length=255),
        ),
    ]
