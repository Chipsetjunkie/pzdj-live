# Generated by Django 3.0.5 on 2020-04-28 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0017_auto_20200428_0923'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='Price',
            field=models.FloatField(blank=True),
        ),
    ]
