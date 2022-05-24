from django.urls import path,include
from rest_framework import routers
from ..views.userViews import UsuarioViewSet,UserViewSet
from .roomsurls import rooms_patterns
rota = routers.DefaultRouter()
rota.register(r'usuarios', UsuarioViewSet,basename='usuarios')

urlpatterns = [
     path('', include(rota.urls)),
     path('user', UserViewSet.as_view()),
     path('rooms/',include(rooms_patterns))
]