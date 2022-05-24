from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario,Rooms,Question,Like
# Register your models here.

class UserAdminConfig(UserAdmin):
    list_display=['id','email','username','last_name','telefone','data_nasc']
    search_fields=['email','username']
    readonly_fields=['date_joined','last_login']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informações Pessoais', {'fields': ('username','profile','last_name','telefone','data_nasc')}),
        ('Activity', {'fields': ('date_joined','last_login')}),
        ('Permissions', {'fields': ('is_admin','is_active','is_staff','is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','username','telefone','data_nasc','password1', 'password2'),
        }),
    )

class RoomsAdmin(admin.ModelAdmin):
    model = Rooms
    list_display=['id','autor','title']
    search_fields=['title']


class QuestionAdmin(admin.ModelAdmin):
    model = Question
    list_display=['id','autor','sala','sala_id','isAwsered','isHighlighted']
    list_display_links =['id','autor','sala']
    search_fields=['sala']
    def autor(self,obj):
        return obj.auto.username

class LikeAdmin(admin.ModelAdmin):
    model = Question
    list_display=['id','autor','question']
    list_display_links =['id','autor','question']
    search_fields=['question']
    def autor(self,obj):
        return obj.auto.username

admin.site.register(Usuario,UserAdminConfig)
admin.site.register(Rooms,RoomsAdmin)
admin.site.register(Question,QuestionAdmin)
admin.site.register(Like,LikeAdmin)


