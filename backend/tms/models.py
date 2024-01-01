from django.db import models

# Create your models here.
class Tm(models.Model):

    id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Phone = models.CharField(max_length=20)
    Email = models.EmailField()

    def __str__(self):
        return f'Tm: {self.Name}'
