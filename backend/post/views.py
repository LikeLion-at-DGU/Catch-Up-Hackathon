from django.db.models import Q
from locale import atoi
from tracemalloc import get_object_traceback
from django.shortcuts import render, get_object_or_404
# Response 추가
from rest_framework.response import Response
# HTTP method를 처리하기 위한 api_view 데코레이터 추가
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import *
# serializers에서 Postserializer를 가져옴
from .serializers import EventSerializer, PostSerializer, ReviewSerializer
from users.serializers import *
# 포스트 리스트 뷰
import jwt

@api_view(['GET'])
@permission_classes([AllowAny])
def mainpage(request):
    #메인페이지에 뿌려줄
    if request.method=='GET':
        #최신 게시물 6개
        if len(Post.objects.all())>=6:
            posts=Post.objects.all().order_by('-created_at')[:6]
        else:
            posts=Post.objects.all()
        data = []
        for post in posts:
            profile = get_object_or_404(Profile, user=post.writer)
            post_serializer = PostSerializer(post)
            profile_serializer = ProfileSerializer(profile)

            target_user_posts = Post.objects.filter(writer=post.writer)
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

            post_writer_set = {
                "post": post_serializer.data,
                "tag": result_taglist,
                "writer": profile_serializer.data,
                "rate": result_rate,
                "is_user": is_user,
                "is_like_user": is_like_user
            }
            data.append(post_writer_set)
        #최신 리뷰 4개
        if len(Review.objects.all())>=4:
            reviews=Review.objects.all()[:4]
        else:
            reviews=Review.objects.all()    
        review_serializer = ReviewSerializer(reviews, many=True)
        result_data={
            "posts":data,
            "reviews":review_serializer.data
        }
        return Response(data=result_data)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def post_create(request):
    # GET 방식을 받아왔을 때
    if request.method == 'GET':
        posts = Post.objects.all()
        data = []
        for post in posts:
            profile = get_object_or_404(Profile, user=post.writer)
            post_serializer = PostSerializer(post)
            profile_serializer = ProfileSerializer(profile)

            target_user_posts = Post.objects.filter(writer=post.writer)
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

            post_writer_set = {
                "post": post_serializer.data,
                "tag": result_taglist,
                "writer": profile_serializer.data,
                "rate": result_rate,
                "is_user": is_user,
                "is_like_user": is_like_user
            }
            data.append(post_writer_set)

        return Response(data=data)

    if request.method == 'POST':
        data = {
            "title": request.data['title'],
            "content": request.data['content']
        }
        serializer = PostSerializer(data=data)
        taglist = request.data['tag']
        tagstr = ''
        for tag in taglist:
            tagstr += tag
        tagstr.strip("/")

        churu = int(request.data['coin'])
        if serializer.is_valid(raise_exception=True):
            serializer.save(writer=request.user, tag=tagstr, churu=churu)
            return Response(data=serializer.data)


@api_view(['GET', 'PATCH', 'DELETE', 'POST'])
@permission_classes([AllowAny])
def post_detail(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)
    reviews = Review.objects.filter(post=post_pk)

    # Post, Review 가져오기 & 조회수
    if request.method == 'GET':
        post.view_users += 1
        post.save()

        post_serializer = PostSerializer(post)
        review_serializer = ReviewSerializer(reviews, many=True)
        data = {
            "post": post_serializer.data,
            "reviews": review_serializer.data,
        }
        return Response(data)
    elif request.method == 'PATCH':
        serializer = PostSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save(post=post)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        post.delete()
        data = {
            'post': post_pk
        }
        return Response(data)

    # 좋아요
    elif request.method == 'POST':
        if request.user.is_authenticated:
            if post.like_users.filter(pk=request.user.pk).exists():
                post.like_users.remove(request.user)
                is_user = 0
            else:
                post.like_users.add(request.user)
                is_user = 1

            post_serializer = PostSerializer(post)
            review_serializer = ReviewSerializer(reviews, many=True)
            data = {
                "post": post_serializer.data,
                "reviews": review_serializer.data,
                "is_user": is_user
            }
            return Response(data)

# Review

# 모든 댓글 보여주기


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def review_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        posts = Post.objects.filter(writer=request.data['user_id'])
        result_review = []
        for post in posts:
            reviews = Review.objects.filter(post=post)
            for review in reviews:
                profile=get_object_or_404(Profile, user=review.writer)
                review_serializer = ReviewSerializer(review)
                profile_serializer = ProfileSerializer(profile)
                review_writer_set = {
                    "review":review_serializer.data,
                    "topic":post.title,
                    "writer":profile_serializer.data
                }
                result_review.append(review_writer_set)
        return Response(result_review)


from chat.models import *
@api_view(['POST'])
def review_create(request):
    if request.method == 'POST':
        room=get_object_or_404(Chatroom, pk=request.data['chatroom_id'])
        review_serializer = ReviewSerializer(data=request.data)
        if review_serializer.is_valid(raise_exception=True):
            review_serializer.save(
                post=room.post, 
                writer=request.user)
        return Response(data=review_serializer.data)

@api_view([''])

#@api_view(['GET', 'POST'])
#def review_create(request, post_pk):
#    post = get_object_or_404(Post, pk=post_pk)
#    writer = request.user
#
#    if request.method == 'GET':
#        reviews = Review.objects.filter(post=post)
#        serializer = ReviewSerializer(reviews, many=True)
#        return Response(data=serializer.data)
#
#    elif request.method == 'POST':
#        review_serializer = ReviewSerializer(data=request.data)
#        if review_serializer.is_valid(raise_exception=True):
#            review_serializer.save(post=post, writer=writer)
#        return Response(data=review_serializer.data)


@api_view(['GET', 'PATCH', 'DELETE'])
def review_detail(request, post_pk, review_pk):
    review = get_object_or_404(Review, pk=review_pk)

    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = ReviewSerializer(instance=review, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        review.delete()
        data = {
            'review': review_pk
        }
        return Response(data)


@api_view(['POST'])
@permission_classes([AllowAny])
def post_search(request):
    posts = Post.objects.all()
    query = request.data['query']
    if query != '':
        posts = posts.filter(
            Q(title__icontains=query) |  # 제목
            Q(content__icontains=query) |  # 내용
            Q(tag__icontains=query)  # 태그
        )
    data = []
    for post in posts:
        profile = get_object_or_404(Profile, user=post.writer)
        post_serializer = PostSerializer(post)
        profile_serializer = ProfileSerializer(profile)
        target_user_posts = Post.objects.filter(writer=post.writer)
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

        post_writer_set = {
            "post": post_serializer.data,
            "tag": result_taglist,
            "writer": profile_serializer.data,
            "rate": result_rate,
            "is_user": is_user
        }
        data.append(post_writer_set)
    return Response(data=data)

# 개발자


@api_view(['GET'])
@permission_classes([AllowAny])
def post_developer(request):
    posts = Post.objects.all()
    data = []
    for post in posts:
        result_taglist = []
        if post.tag != None:
            tag_list = post.tag.split('#')
            for tag in tag_list:
                if len(tag) > 0:
                    result_taglist.append('#'+tag)

        if '#개발자' in result_taglist:
            profile = get_object_or_404(Profile, user=post.writer)
            post_serializer = PostSerializer(post)
            profile_serializer = ProfileSerializer(profile)

            target_user_posts = Post.objects.filter(writer=post.writer)
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

            if post.writer == request.user:
                is_user = 1
            else:
                is_user = 0

            if post.like_users.filter(pk=request.user.pk).exists():
                is_like_user = 1
            else:
                is_like_user = 0

            post_writer_set = {
                "post": post_serializer.data,
                "tag": result_taglist,
                "writer": profile_serializer.data,
                "rate": result_rate,
                "is_user": is_user,
                "is_like_user": is_like_user
            }
            data.append(post_writer_set)
    return Response(data=data)

# 해외취업


@api_view(['GET'])
@permission_classes([AllowAny])
def post_overseas(request):
    posts = Post.objects.all()
    data = []
    for post in posts:
        result_taglist = []
        if post.tag != None:
            tag_list = post.tag.split('#')
            for tag in tag_list:
                if len(tag) > 0:
                    result_taglist.append('#'+tag)

        if '#해외취업' in result_taglist:
            profile = get_object_or_404(Profile, user=post.writer)
            post_serializer = PostSerializer(post)
            profile_serializer = ProfileSerializer(profile)

            target_user_posts = Post.objects.filter(writer=post.writer)
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

            if post.writer == request.user:
                is_user = 1
            else:
                is_user = 0

            if post.like_users.filter(pk=request.user.pk).exists():
                is_like_user = 1
            else:
                is_like_user = 0

            post_writer_set = {
                "post": post_serializer.data,
                "tag": result_taglist,
                "writer": profile_serializer.data,
                "rate": result_rate,
                "is_user": is_user,
                "is_like_user": is_like_user
            }
            data.append(post_writer_set)

    return Response(data=data)

# 네카라쿠배


@api_view(['GET'])
@permission_classes([AllowAny])
def post_nekarakubae(request):
    posts = Post.objects.all()
    data = []
    for post in posts:
        result_taglist = []
        if post.tag != None:
            tag_list = post.tag.split('#')
            for tag in tag_list:
                if len(tag) > 0:
                    result_taglist.append('#'+tag)

        if '#네카라쿠배' in result_taglist:
            profile = get_object_or_404(Profile, user=post.writer)
            post_serializer = PostSerializer(post)
            profile_serializer = ProfileSerializer(profile)

            target_user_posts = Post.objects.filter(writer=post.writer)
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

            if post.writer == request.user:
                is_user = 1
            else:
                is_user = 0

            if post.like_users.filter(pk=request.user.pk).exists():
                is_like_user = 1
            else:
                is_like_user = 0

            post_writer_set = {
                "post": post_serializer.data,
                "tag": result_taglist,
                "writer": profile_serializer.data,
                "rate": result_rate,
                "is_user": is_user,
                "is_like_user": is_like_user
            }
            data.append(post_writer_set)

    return Response(data=data)

# 마케팅


@api_view(['GET'])
@permission_classes([AllowAny])
def post_marketing(request):
    posts = Post.objects.all()
    data = []
    for post in posts:
        result_taglist = []
        if post.tag != None:
            tag_list = post.tag.split('#')
            for tag in tag_list:
                if len(tag) > 0:
                    result_taglist.append('#'+tag)

        if '#마케팅' in result_taglist:
            profile = get_object_or_404(Profile, user=post.writer)
            post_serializer = PostSerializer(post)
            profile_serializer = ProfileSerializer(profile)

            target_user_posts = Post.objects.filter(writer=post.writer)
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

            if post.writer == request.user:
                is_user = 1
            else:
                is_user = 0

            if post.like_users.filter(pk=request.user.pk).exists():
                is_like_user = 1
            else:
                is_like_user = 0

            post_writer_set = {
                "post": post_serializer.data,
                "tag": result_taglist,
                "writer": profile_serializer.data,
                "rate": result_rate,
                "is_user": is_user,
                "is_like_user": is_like_user
            }
            data.append(post_writer_set)

    return Response(data=data)


# Event
@api_view(['GET'])
@permission_classes([AllowAny])
def event_list(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)
