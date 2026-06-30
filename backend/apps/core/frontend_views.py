from django.conf import settings
from django.http import JsonResponse
from django.views.generic import TemplateView


class FrontendAppView(TemplateView):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        frontend_index = settings.REPO_DIR / "frontend" / "dist" / self.template_name

        if frontend_index.exists():
            return super().get(request, *args, **kwargs)

        return JsonResponse({
            "status": "ok",
            "service": "Department of Computer Applications API",
        })
