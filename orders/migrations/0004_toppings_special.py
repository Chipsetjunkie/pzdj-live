# Generated by Django 3.0.4 on 2020-04-24 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_test_default'),
    ]

    operations = [
        migrations.AddField(
            model_name='toppings',
            name='special',
            field=models.CharField(choices=[('true', 'true'), ('false', 'false')], default=('false', 'false'), max_length=64),
        ),
    ]
