from django.urls import path,include
from ..views.roomsView import (
    CreateRoomsView,
    CheckRoomView,
    CreateQuestionView,
    ListQuestionView,
    LastQuestionView,
    CreateLikesView
    )

rooms_patterns = [
    path('create',CreateRoomsView.as_view()),
    path('checkroom',CheckRoomView.as_view()),
    path('new-question',CreateQuestionView.as_view()),
    path('list-question',ListQuestionView.as_view()),
    path('last-question',LastQuestionView.as_view()),
    path('like-question',CreateLikesView.as_view()),
]