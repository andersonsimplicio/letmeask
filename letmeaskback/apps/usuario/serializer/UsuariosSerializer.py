from ..models import Usuario
from rest_framework import serializers

class UsuarioSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Usuario
        fields =['id','profile','username','email','telefone','data_nasc']



