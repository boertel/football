"""football URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path

from django.shortcuts import render
from django.conf import settings


def default_view(request):
    BUNDLE_VERSION = request.GET.get('bundle', settings.BUNDLE_VERSION)
    context = {
        'BUNDLE_PATH': os.path.join(settings.BUNDLE_HOST, BUNDLE_VERSION),
        'STATIC_HOST': settings.STATIC_HOST,
    }
    response = render(request, 'index.html', context)
    if 'bundle' in request.GET:
        response.set_cookie('bundle', BUNDLE_VERSION)
    return response


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include('betting.urls')),
    path('accounts/', include('account.urls')),
]

if not settings.DEBUG:
    urlpatterns.append(re_path(r'^.*', default_view))
