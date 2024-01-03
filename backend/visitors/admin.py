from django.contrib import admin
from .models import Visitor

# Register your models here.
models_list = [Visitor]
admin.site.register(models_list)
