from django.db import models

# Create your models here.
from django.db import models
from visitors.models import Visitor
from employees.models import Employee

class Visit(models.Model):
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE)
    host = models.ForeignKey(Employee, on_delete=models.CASCADE)
    visit_type = models.CharField(max_length=255)  
    purpose = models.CharField(max_length=255)
    checkin = models.DateTimeField(auto_now_add=True)
    checkout = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Visit by {self.visitor.Name} hosted by {self.host.Name}"

    class Meta:
        ordering = ['-checkin']