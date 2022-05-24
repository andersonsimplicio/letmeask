from django.contrib.auth.models import AbstractBaseUser,UserManager,PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.db import models


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'user_{0}_{1}/{2}'.format(instance.id, instance.username,filename)

class Usuario(AbstractBaseUser,PermissionsMixin):
    email  = models.EmailField(_('email address'), unique=True)
    username  = models.CharField(max_length=30,unique=True)
    last_name  = models.CharField(max_length=30,blank=True)
    telefone = models.CharField(max_length=20)
    profile = models.ImageField(upload_to =user_directory_path,null=True, blank=True)
    data_nasc = models.DateField(blank=True,null=True)

    date_joined   = models.DateTimeField(verbose_name='date_joined',auto_now_add=True)
    last_login    = models.DateTimeField(verbose_name='last login',auto_now=True)
    is_admin      = models.BooleanField(default=False)
    is_active     = models.BooleanField(default=True)
    is_staff      = models.BooleanField(default=False)
    is_superuser  = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def get_full_name(self):
        return str(self)
    
    def get_short_name(self):
        return str(self).split(' ')[0]

    def __str__(self):
        return self.email or self.username

class Rooms(models.Model):
    title = models.CharField(max_length=50,unique=True)
    autor = models.ForeignKey(Usuario,related_name='rooms', on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'
    
    def __str__(self):
        return self.title


class Question(models.Model):
    autor = models.ForeignKey(Usuario, related_name='question',on_delete=models.CASCADE)
    sala = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    question = models.CharField(max_length=300,null=True, blank=True)
    isAwsered = models.BooleanField(default=False)
    isHighlighted = models.BooleanField(default=False)
   
    class Meta:
        verbose_name = 'Pergunta'
        verbose_name_plural = 'Perguntas'
    
    def __str__(self):
        return f'autor {self.autor.username} question {self.question}'

class Like(models.Model):
    autor = models.ForeignKey(Usuario, related_name='autor_likes',on_delete=models.CASCADE)
    question = models.ForeignKey(Question,related_name='question_likes',on_delete=models.CASCADE,null=True, blank=True)
   
    class Meta:
        verbose_name = 'Like'
        verbose_name_plural = 'Likes'
        unique_together = ['autor', 'question']
        
    def __str__(self):
        return f'User {self.autor.username} Question{ self.question}'