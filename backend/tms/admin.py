from django.contrib import admin
from .models import Tm

# Register your models here.
models_list = [Tm]
admin.site.register(models_list)
