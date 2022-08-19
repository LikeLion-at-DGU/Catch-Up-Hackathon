import base64
from django.conf import settings
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import *
from chat.models import *
from .serializers import *

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

# user create


@api_view(['GET', 'POST'])
def user_list_create(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(data=serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data)

# user detail, update, delete


@api_view(['GET', 'PATCH', 'DELETE'])
def user_rud(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)

    # /id값/ 검색 시 해당 객체 출력
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # 객체 수정
    elif request.method == 'PATCH':
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        user.delete()
        data = {
            'user': user_pk
        }
        return Response(data)

# profile


@api_view(['GET'])
@permission_classes([AllowAny])
def user_profile(request, user_id):
    user = User.objects.get(pk=user_id)
    if request.method == 'GET':
        # 채팅 정보
        rooms = Chatroom.objects.all()
        room_count = 0
        for room in rooms:
            if room.is_user_in_talkers(user):
                room_count += 1

        # user 프로필
        profile = Profile.objects.get(user=user)
        profile_serializer = ProfileSerializer(profile)

        # 상대방 user 프로필
        target_user_posts = Post.objects.filter(writer=user)
        sum_rate = 0
        result_rate = 5
        review_account = 0
        for p in target_user_posts:
            reviews = Review.objects.filter(post=p)
            for review in reviews:
                sum_rate += review.rate
                review_account += 1
        if review_account > 0:
            result_rate = round(sum_rate/review_account, 1)

        # # user 좋아요 목록
        # like_user_post = Post.objects.filter(like_users=user)
        # like_serializer = PostSerializer(like_user_post, many=True)

        data = {
            "profile": profile_serializer.data,
            "room_count": room_count,
            "rate": result_rate,
            # 'like_user_post': like_serializer.data,
        }
        return Response(data)


# myprofile update


@api_view(['GET', 'PATCH'])
def profile_update(request):
    user = request.user
    print(user)
    if request.method == 'GET':
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return Response(data=serializer.data)
    elif request.method == 'PATCH':
        profile = Profile.objects.get(user=user)

        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(data=serializer.data)

# user모델이 삭제되면 profile이 자동 삭제됨으로 삭제 구현 X

# myprofile


@api_view(['GET'])
def myprofile(request):
    user = request.user
    if request.method == 'GET':
        rooms = Chatroom.objects.all()
        room_count = 0
        for room in rooms:
            if room.is_user_in_talkers(user):
                room_count += 1
        profile = Profile.objects.get(user=user)
        profile_serializer = ProfileSerializer(profile)
        target_user_posts = Post.objects.filter(writer=user)
        sum_rate = 0
        result_rate = 5
        review_account = 0
        for p in target_user_posts:
            reviews = Review.objects.filter(post=p)
            for review in reviews:
                sum_rate += review.rate
                review_account += 1
        if review_account > 0:
            result_rate = round(sum_rate/review_account)

        data = {
            "profile": profile_serializer.data,
            "room_count": room_count,
            "rate": result_rate,
        }

        # user 좋아요 목록
        like_user_post = Post.objects.filter(like_users=user)
        if like_user_post:
            data['like_user_post'] = []
            for post in like_user_post:
                profile = get_object_or_404(Profile, user=post.writer)
                like_serializer = PostSerializer(post)
                like_profile_serializer = ProfileSerializer(profile)

                target_like_user_posts = Post.objects.filter(
                    writer=post.writer)
                sum_rate = 0
                result_rate = 5
                review_account = 0
                for p in target_like_user_posts:
                    reviews = Review.objects.filter(post=p)
                    for review in reviews:
                        sum_rate += review.rate
                        review_account += 1
                if review_account > 0:
                    result_rate = round(sum_rate/review_account)

                result_taglist = []
                if post.tag != None:
                    tag_list = post.tag.split('#')
                    for tag in tag_list:
                        if len(tag) > 0:
                            result_taglist.append('#'+tag)
                if post.writer == request.user:
                    is_user = 1
                else:
                    is_user = 0

                if post.like_users.filter(pk=request.user.pk).exists():
                    is_like_user = 1
                else:
                    is_like_user = 0

                like_post_writer_set = {
                    "post": like_serializer.data,
                    "tag": result_taglist,
                    "writer": like_profile_serializer.data,
                    "rate": result_rate,
                    "is_user": is_user,
                    "is_like_user": is_like_user
                }
                data['like_user_post'].append(like_post_writer_set)
        return Response(data)

# 츄르 충전


@api_view(['GET', 'PATCH'])
def churu_charge(request):
    user = request.user
    if request.method == 'GET':
        profile = Profile.objects.get(user=user)
        serializer = ChuruSerializer(profile)
        profile.churu_charging = 0
        return Response(data=serializer.data)
    elif request.method == 'PATCH':
        profile = Profile.objects.get(user=user)
        serializer = ChuruSerializer(profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            profile.churu += profile.churu_charging
            profile.save()
        return Response(data=serializer.data)
