import logging

from django.contrib import admin
from django.urls import path, include, re_path
from django.http import Http404

from web.views import index

logger = logging.getLogger(__name__)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/v1/auth/", include("authentication.urls")),
    path("api/v1/", include("betting.urls")),
]


def http_404(request):
    raise Http404()


views_404 = []
for urlpattern in urlpatterns:
    try:
        views_404.append(re_path(r"^{}.*".format(urlpattern.pattern._route), http_404))
    except Exception as exception:
        logger.error("failed to add 404 view", urlpattern, exception)
        pass

urlpatterns += views_404

urlpatterns += [re_path(r"^.*$", index)]
