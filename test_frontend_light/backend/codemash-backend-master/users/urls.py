
from django.conf.urls import url
from .views import CreateUserAPIView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^create/$', CreateUserAPIView.as_view()),
    url(r'^api-token-auth/', obtain_jwt_token),
]
