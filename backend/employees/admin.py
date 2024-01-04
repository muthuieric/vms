from django.contrib import admin
from .models import Employee

# Register your models here.
models_list = [Employee]
admin.site.register(models_list)