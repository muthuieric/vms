from django.contrib import admin
from .models import Visit

# Register your models here.
models_list = [Visit]
admin.site.register(models_list)
