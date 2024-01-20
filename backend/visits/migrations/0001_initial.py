# Generated by Django 4.2.8 on 2024-01-20 17:33

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Visit",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("visitor", models.CharField(max_length=255)),
                ("host", models.CharField(max_length=255)),
                ("visit_type", models.CharField(max_length=255)),
                ("purpose", models.CharField(max_length=255)),
                ("checkin", models.DateTimeField(auto_now_add=True)),
                ("checkout", models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
