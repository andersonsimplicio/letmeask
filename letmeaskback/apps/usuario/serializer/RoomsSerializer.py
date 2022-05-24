from ..models import (
    Rooms,
    Question,
    Usuario,
    Like
    )

from rest_framework.serializers import ModelSerializer,ReadOnlyField
from rest_framework import serializers
from django.core.serializers import json

class RoomsSerializer(ModelSerializer):
    class Meta:
        model =  Rooms
        fields =['id','autor','title']


class QuestionSerializer(ModelSerializer):
    autor = ReadOnlyField(source='autor.id')
    sala = ReadOnlyField(source='sala.id')
    class Meta:
        model = Question
        fields =['id','autor','sala','question','isAwsered','isHighlighted']

class QuestionCreateSerializer(ModelSerializer):

    class Meta:
        model = Question
        fields =['id','autor','sala','question']

class UserCamposSerializer(ModelSerializer):
    profile = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Usuario
        fields =['id','profile','username']
        
    def get_photo_url(self, usuario):
        request = self.context.get('request')
        profile = usuario.profile.url
        return request.build_absolute_uri(photo_url)

class UserLikesSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields =['id']


class LikeSerializer(ModelSerializer):
    autor = UserLikesSerializer(read_only=True)
    class Meta:
        model = Like
        fields =['id','autor']


class QuestionListaSerializer(ModelSerializer):
    
    autor = UserCamposSerializer(read_only=True)
    sala = ReadOnlyField(source='sala.id')  
    count_likes = serializers.SerializerMethodField(read_only=True)
    i_like = serializers.SerializerMethodField(read_only=True)
    list_likes =  serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields =['id','autor','sala','question','count_likes','i_like','list_likes']
        
    def get_count_likes(self,model):
        question_likes = LikeSerializer(many=True,read_only=True)
        return model.question_likes.all().count()
    
    def get_i_like(self,model=None,user=None):
        return 'false'
    
    def get_list_likes(self,model):
        lista = model.question_likes.all()
        list_likes = LikeSerializer(lista,read_only=True,many=True)        
        return list_likes.data


class LikesSerializer(ModelSerializer):
    autor = UserLikesSerializer(read_only=True)
    class Meta:
        model = Like
        fields =['id','autor','question']

