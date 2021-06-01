from django.shortcuts import render
from django.conf import settings


def index(request):
    directory = settings.WEB_DIRECTORY
    return render(request, "{}/index.html".format(directory))
