# Generated by Django 3.2.9 on 2021-12-21 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0002_taxonomia_clase'),
    ]

    operations = [
        migrations.RenameField(
            model_name='animal',
            old_name='especie',
            new_name='sub_especie',
        ),
    ]
