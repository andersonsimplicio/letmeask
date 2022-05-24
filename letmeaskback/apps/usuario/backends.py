from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from .models import Usuario


class ModelBackEnd(ModelBackend):

    def authenticate(self, username=None,password=None):
        print(username)
        if not username is None:
            try:
                user = Usuario.objects.get(email=username)  
                if user.check_password(password):
                    return user
            except Usuario.DoesNotExist:
                pass