# Generated by Django 3.0.5 on 2020-04-28 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0025_auto_20200428_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='stuff',
            field=models.ManyToManyField(to='orders.Order'),
        ),
    ]
