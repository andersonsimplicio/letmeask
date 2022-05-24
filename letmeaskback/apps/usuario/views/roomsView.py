from rest_framework.generics import CreateAPIView,ListAPIView
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import permissions,authentication
from ..serializer.RoomsSerializer import (
     RoomsSerializer,
     QuestionSerializer,
     QuestionCreateSerializer,
     QuestionListaSerializer,
     LikeSerializer,
     LikesSerializer,
    )
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Rooms,Question,Usuario,Like
from rest_framework.authtoken.models import Token

class CreateRoomsView(CreateAPIView):
    serializer_class = RoomsSerializer
    http_method_names = ['post']
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

class CheckRoomView(APIView):
    serializer_class = RoomsSerializer
    http_method_names = ['post']

    def post(self, request, format=None):
        """
        Return a Room.
        """
        try:
            id_room = request.data['id']
            room = get_object_or_404(Rooms,pk=id_room)
            roomSerializer = RoomsSerializer(room)
        except Exception as e:
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(data={'room':roomSerializer.data},status=status.HTTP_200_OK)

class CreateQuestionView(CreateAPIView):
    serializer_class = QuestionCreateSerializer
    queryset = Question.objects.all()
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]



class ListQuestionView(ListAPIView):
    serializer_class = QuestionListaSerializer 
    queryset = Question.objects.all()
    http_method_names = ['post','get']
    
    def get_queryset(self):
        queryset = Question.objects.all()
        return queryset
    
    
    def post(self, request, format=None):
        sala = self.request.data['sala']
        try:
            token = self.request.data['token']
            key = Token.objects.get(key=token)
        except Exception as e:
            print(e)
            key=False
        if key:
            users = Usuario.objects.get(auth_token=key)
            try:
                queryset = Question.objects.filter(sala=sala)
                qsSerialize = QuestionListaSerializer(queryset,many=True)
                 
                for i in range(len(qsSerialize.data)):
                    list_likes = qsSerialize.data[i]['list_likes']
                    id_likes = [dict(dict(like)['autor']) for like in list_likes] 
                    id_aut = [ u_id['id'] for u_id in id_likes]
                    if users.id in id_aut:
                        qsSerialize.data[i]['i_like']='true'     
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_204_NO_CONTENT) 
        else:
            try:
                queryset = Question.objects.filter(sala=sala)
                qsSerialize = QuestionListaSerializer(queryset,many=True)
                
            except Exception as e:
                return Response(status=status.HTTP_204_NO_CONTENT)        
        return Response(data={'questions':qsSerialize.data},status=status.HTTP_200_OK)



class LastQuestionView(ListAPIView):

    serializer_class = QuestionListaSerializer 
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Question.objects.all()
    http_method_names = ['post','get']
    
    def get_queryset(self):
        queryset = Question.objects.all()
        return queryset
    
    
    def post(self, request, format=None):
        
        sala = self.request.data['sala']

        try:
            queryset = Question.objects.filter(sala=sala).last()
            qsSerialize = QuestionListaSerializer(queryset)
           
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_204_NO_CONTENT)        
        return Response(data={'question':qsSerialize.data},status=status.HTTP_200_OK)
    
class CreateLikesView(CreateAPIView):
    serializer_class = LikesSerializer
    queryset = Like.objects.all()
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        try:    
            user =get_object_or_404(Usuario,id=request.data['autor'])
            question = get_object_or_404(Question,id=request.data['question'])
            obj, created = Like.objects.get_or_create(autor=user,question=question)
            if not created:
                obj.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_404_NOT_FOUND)

            
