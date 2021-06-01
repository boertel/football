from django.core.files.storage import default_storage
from django.template import Origin, TemplateDoesNotExist
from django.template.loaders.base import Loader


class S3TemplateLoader(Loader):
    def get_template_sources(self, template_name):
        name = "builds/{}".format(template_name)
        yield Origin(name=name, template_name=template_name, loader=self)

    def get_contents(self, origin):
        if default_storage.exists(origin.name):
            with default_storage.open(origin.name, "r") as fp:
                return fp.read()
        raise TemplateDoesNotExist(origin)
