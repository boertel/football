from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect

from betting.models import User


def signup(request):
    data = {
        'username': request.POST['username'],
        'email': request.POST['username'],
        'password': request.POST['password'],
        'first_name': request.POST['first_name'],
        'last_name': request.POST.get('last_name'),
    }

    user = User.objects.create_user(**data)
    if user:
        return login_view(request)
    return redirect('/failed')


def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return redirect('/dashboard')
    else:
        return redirect('/failed')


def logout_view(request):
    logout(request)
    return redirect('/')
