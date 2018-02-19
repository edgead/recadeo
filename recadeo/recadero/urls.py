from django.conf.urls import url
from recadero.views import CreateRecado, EnviarRecadoACuba, EnviarRecadoDesdeCuba
from recadero.views import AngularRecado

app_name = 'recadero'
urlpatterns = [
    url(r'^crear-recado/$', CreateRecado.as_view(), name='crear_recado'),
    url(r'^enviar-recado-a-cuba/$', EnviarRecadoACuba.as_view(), name='enviar_recado_a_cuba'),
    url(r'^enviar-recado-desde-cuba/$', EnviarRecadoDesdeCuba.as_view(), name='enviar_recado_desde_cuba'),
    url(r'^angular-recado/$', AngularRecado.as_view(), name='angular_recado'),
]
