from django.urls import path
from .views import *

app_name = 'users'
urlpatterns = [
    path('user_list/', user_list_create, name="user_list_create"),
    path('<int:user_pk>/', user_rud, name="user_rud"),
    path('profile/<int:user_id>', user_profile, name="user_profile"), # 모든 유저 프로필 출력
    path('myprofile/',myprofile,name='myprofile'), # 내 프로필 출력
    path('myprofile_update/', profile_update, name="profile_update"), # 내 프로필 수정
    path('churu_charge/', churu_charge, name="churu_charge"),
]
