from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from ..authentications import SessionAuthentication
from ..serializers import MeSerializer


class MeView(RetrieveUpdateAPIView):
    serializer_class = MeSerializer
    # TODO can we return 401 when the session is invalid?
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
