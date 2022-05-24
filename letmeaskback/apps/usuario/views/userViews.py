from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import permissions,authentication
from ..serializer.UsuariosSerializer import UsuarioSerializer
from rest_framework.response import Response
from ..models import Usuario

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.get_queryset().order_by('id')
    serializer_class = UsuarioSerializer
    http_method_names = ['get','post','put','path']
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class UserViewSet(APIView):
    serializer_class = UsuarioSerializer
    http_method_names = ['post']
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request,format=None):
        token = request.data['token']
        user = Token.objects.get(key=token)
        print(f'Usuario: {user.user}')
        queryset = Usuario.objects.get(email=user.user)
        
        serializer =UsuarioSerializer(queryset,context={"request": request})
        return Response(serializer.data,status=status.HTTP_200_OK)