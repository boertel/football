from django.contrib.auth import logout as django_logout

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class LogoutView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        return self.logout(request)

    def process_logout(self, request):
        django_logout(request)

    def logout(self, request):
        self.process_logout(request)
        return Response({}, status=status.HTTP_200_OK)
