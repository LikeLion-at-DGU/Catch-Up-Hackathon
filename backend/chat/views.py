from django.shortcuts import render, get_object_or_404
from .models import *
from post.models import *
from users.models import *
from .serializers import *
from users.serializers import *
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view

@api_view(['POST'])
def create_chatroom(request):
    #POST방식일 때 채팅방 생성
    if request.method == 'POST':
        current_post = get_object_or_404(Post, pk=request.data['post_id'])
        current_user = request.user
        current_profile = get_object_or_404(Profile, user=current_user)
        if current_profile.churu >= current_post.churu:
            current_profile.churu = current_profile.churu - current_post.churu
            print(current_profile.churu)
            current_profile.save()
            is_chure_valid = 1
            chatroom_serializer = ChatroomSerializer(data=request.data)
            if chatroom_serializer.is_valid(raise_exception=True):
                chatroom_serializer.save(
                    post = current_post, 
                    questioner = current_user,
                    answerer = current_post.writer)
                data = {
                    "is_chure_valid":is_chure_valid,
                    "chatroom":chatroom_serializer.data
                }
                return Response(data=data)
        else :
            is_chure_valid = 0
            data = {
                "is_chure_vallid":is_chure_valid,
                "chatroom":"채팅룸이 만들어지지 않았어요 흑흑"
            }
            return Response(data=data)
        

@api_view(['GET'])
def list_chatroom(request):
    if request.method == 'GET':
        current_user = request.user
        chatrooms = Chatroom.objects.all()
        data = []
        for room in chatrooms:
            if room.is_user_in_talkers(current_user):
                #채팅방 정보
                roomserializer = ChatroomSerializer(room)   
                #채팅 상대 정보
                partner_user = room.opponent(current_user)
                partner_profile = get_object_or_404(Profile, user=partner_user)
                opponent_profile_serializer = ProfileSerializer(partner_profile)
                room_chat_set = {
                    "room":roomserializer.data,
                    "opponent":opponent_profile_serializer.data
                }
                #가장 최근 채팅 정보
                if Chat.objects.filter(chatroom=room):
                    chat = Chat.objects.filter(chatroom=room)
                    chat = chat.last()
                    chat_serializer = ChatListSerializer(chat)
                    room_chat_set['last_chat'] = chat_serializer.data
                data.append(room_chat_set)
        return Response(data=data)


@api_view(['GET', 'POST', 'DELETE'])
def chatlist_roomdelete(request, chatroom_id):
    room = get_object_or_404(Chatroom, id=chatroom_id)
    current_user = request.user
    if request.method == 'GET':
        chats = Chat.objects.filter(chatroom = room).order_by('created_at')
        chat_list_serializer = ChatListSerializer(chats, many=True)
        partner_user = room.opponent(current_user)
        partner_profile = get_object_or_404(Profile, user=partner_user)
        opponent_profile_serializer = ProfileSerializer(partner_profile)
        data = {
            "topic" : room.post.title,
            "opponent":opponent_profile_serializer.data,
            "chat_list":chat_list_serializer.data,
        }
        return Response(data=data)
    elif request.method == 'POST':
        serializer = ChatListSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(
                chatroom = room,
                writer = current_user, 
                content = request.data['content'])
            return Response(data=serializer.data)
    elif request.method == 'DELETE':
        room.delete()
        data={
            'chatroom':chatroom_id
        }
        return Response(data)

