from django.urls import path
from .views import *

app_name = 'posts'
urlpatterns = [
    # 포스트
    path('', post_create, name='post'),
    path('<int:post_pk>/', post_detail, name='post_detail'),

    # 리뷰
    path('review/', review_list, name='reviewList'), # 모든 댓글 보여주기
    path('review/create/', review_create, name='review'), # 특정 포스트에 댓글 작성
    path('<int:post_pk>/review/<int:review_pk>/', review_detail, name='review_detail'), # 특정 포스트에 댓글 수정, 삭제
    path('search/', post_search, name='search'),

    # 해시태그 
    path('developer/', post_developer, name="post_developer"),
    path('overseas/', post_overseas, name="post_overseas"),
    path('nekarakubae/', post_nekarakubae, name="post_nekarakubae"),
    path('marketing/', post_marketing, name="post_marketing"),
    # 이벤트
    path('event/', event_list, name='eventList'),
    # 메인페이지
    path('mainpage/', mainpage, name="mainpage"),

]
