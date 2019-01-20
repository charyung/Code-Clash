from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'), # /blocks
    path('<int:block_id>', views.detail, name='detail'), # /blocks/1
    path('vote', views.vote, name='vote'), # /blocks/vote
]