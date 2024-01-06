from django.db import models
from django.utils import timezone


# Create your models here.
class Visit(models.Model):
    visitor = models.CharField(max_length=255)
    host = models.CharField(max_length=255)
    visit_type = models.CharField(max_length=255)  
    purpose = models.CharField(max_length=255)
    checkin = models.DateTimeField(auto_now_add=True)
    checkout = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Visit by {self.visitor} hosted by {self.host}"
    
 
