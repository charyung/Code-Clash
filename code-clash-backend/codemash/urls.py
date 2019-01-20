# django_auth/urls.py
from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^user/', include(('users.urls', 'users'), namespace='users')),
    path('blocks/', include('blocks.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
]
