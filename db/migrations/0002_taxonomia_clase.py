# Generated by Django 3.2.9 on 2021-12-21 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='taxonomia',
            name='clase',
            field=models.CharField(help_text='Clase del animal', max_length=255),
            preserve_default=False,
        ),
    ]
