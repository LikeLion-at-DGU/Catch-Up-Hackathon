from django.db import models
from users.models import User

class Post(models.Model):
    title = models.CharField(max_length=200)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_users = models.ManyToManyField(User, related_name='likes_user', blank=True)
    view_users = models.IntegerField(default=0)
    churu = models.IntegerField(default=0) # Front에서 field 이름을 coin으로.
    tag = models.CharField(max_length=20, null=True, blank=True)


    def __str__(self):
        return self.title

class Review(models.Model):
    RATES = (
        (0,0),
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5),
    )
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    rate = models.IntegerField(default=0, choices=RATES)
    context = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

class Event(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()