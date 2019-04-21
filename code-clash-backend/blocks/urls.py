from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='blocksIndex'), # /blocks
    path('create', views.create, name='blocksCreate'), # /blocks/create
    path('<int:block_id>', views.detail, name='blocksDetail'), # /blocks/1
    path('vote', views.vote, name='blocksVote'), # /blocks/vote
]