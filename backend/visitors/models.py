from django.db import models

# Create your models here.
class Visitor(models.Model):
    Name = models.CharField(max_length=255)
    Id_number = models.CharField(max_length=20)
    Phone = models.CharField(max_length=20)
    Email = models.EmailField()
    Red_flag = models.BooleanField(default=False)

    def __str__(self):
        return self.name
