# Generated by Django 3.2.9 on 2021-11-30 20:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registro',
            name='autorizado_por',
        ),
        migrations.RemoveField(
            model_name='registro',
            name='ci_recibido',
        ),
        migrations.AddField(
            model_name='registro',
            name='ci_autorizado_por',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='autorizador', to='db.operador'),
        ),
        migrations.AddField(
            model_name='registro',
            name='ci_recibido_por',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recibidor', to='db.operador'),
        ),
    ]