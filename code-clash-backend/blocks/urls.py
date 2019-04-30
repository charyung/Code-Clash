from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='blocksIndex'), # /blocks
    path('<int:block_id>', views.get, name='blocksDetail'), # /blocks/1
    path('get', views.getTwoBlocks, name='blocksGet'), # /blocks/get
    path('create', views.create, name='blocksCreate'), # /blocks/create
    path('vote', views.vote, name='blocksVote'), # /blocks/vote
]