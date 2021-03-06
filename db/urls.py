from django.conf.urls import url
from db import views

urlpatterns = [
    url(r'^login$', views.login),
    url(r'^admin$', views.admin),
    url(r'^registro$', views.registro),
    url(r'^animal$', views.animal),
    url(r'^operador$', views.operador),
    url(r'^archivo$', views.archivo),
    url(r'^operador/(?P<pk>[0-9]+)$', views.operador_detail),
    url(r'^baja$', views.baja),
    url(r'^taxonomia$', views.taxonomia),
    url(r'^taxonomia/(?P<pk>[a-zA-Z0-9_]+)$', views.taxonomia_detail),
    url(r'^microchip$', views.microchip),
    url(r'^animal/(?P<pk>[0-9]+)$', views.animal_detail),
    url(r'^archivo/(?P<pk>[a-zA-Z0-9_\s,.]+)$', views.archivo_detail),
]
