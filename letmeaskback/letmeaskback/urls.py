from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('',include('apps.usuario.urls'))
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)
