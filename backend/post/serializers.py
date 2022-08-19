from multiprocessing import Event
from rest_framework import serializers

from users.models import User
from .models import Post, Review


class ReviewSerializer(serializers.ModelSerializer):
    writer = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    
    writer = serializers.PrimaryKeyRelatedField(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)


    class Meta:

        model = Post

        fields = (
            'id',
            'title',
            'writer',
            'content',
            'created_at',
            'updated_at',
            'like_users',
            'view_users',
            'tag',
            'reviews',
            'churu',
        )

class EventSerializer(serializers.ModelSerializer):
    class Meta:

        model = Event
        fields = '__all__'