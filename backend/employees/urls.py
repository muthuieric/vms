from django.urls import path
from .views import EmployeeView

urlpatterns = [
    path('employees/',EmployeeView.as_view(), name='employee-list'), 
    path('employees/<int:pk>/', EmployeeView.as_view(), name='employee-detail'), ]