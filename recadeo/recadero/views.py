from django.shortcuts import render
# Create your views here.
from django.views.generic import TemplateView


class CreateRecado(TemplateView):
    template_name = 'recadero/create_recado.html'

    def get_context_data(self, **kwargs):
        context = super(CreateRecado, self).get_context_data(**kwargs)
        return context


class EnviarRecadoACuba(TemplateView):
    template_name = 'recadero/enviar_recado_a_cuba.html'

    def get_context_data(self, **kwargs):
        context = super(EnviarRecadoACuba, self).get_context_data(**kwargs)
        return context


class EnviarRecadoDesdeCuba(TemplateView):
    template_name = 'recadero/enviar_recado_desde_cuba.html'

    def get_context_data(self, **kwargs):
        context = super(EnviarRecadoDesdeCuba, self).get_context_data(**kwargs)
        return context


class AngularRecado(TemplateView):
    template_name = 'recadero/angular_recado.html'

    def get_context_data(self, **kwargs):
        context = super(AngularRecado, self).get_context_data(**kwargs)
        return context
