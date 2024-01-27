from django.contrib import admin
from .models import UserAccount

# Register your models here.
models_list = [UserAccount]
admin.site.register(models_list)