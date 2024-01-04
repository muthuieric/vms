from django.shortcuts import render
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse

 # Create your views here.
class EmployeeView(APIView):
    def get_employee(self, pk):
        try:
            employee = Employee.objects.get(id=pk)
            return employee
        except Employee.DoesNotExist:
            return JsonResponse("Employee Does Not Exist", safe=False)
    
    def get(self, request, pk=None):
        if pk:
            data = self.get_employee(pk)
            serializer = EmployeeSerializer(data)
        else: 
            data = Employee.objects.all() 
            serializer = EmployeeSerializer(data, many=True) 
        return Response(serializer.data)
        
    def post(self, request):
        data = request.data 
        serializer = EmployeeSerializer(data=data) 

        if serializer.is_valid():
            serializer.save() 
            return JsonResponse("Employee Added Successfully", safe=False) 
        return JsonResponse("Failed to Add Employee", safe=False) 
    
    def put(self, request, pk=None): 
        employee_to_update = Employee.objects.get(id=pk) 
        serializer = EmployeeSerializer(instance=employee_to_update, data=request.data, partial=True) 
        
        if serializer.is_valid(): 
            serializer.save() 
            return JsonResponse("Employee Updated Successfully", safe=False) 
        return JsonResponse("Failed To Update Employee", safe=False) 
    
    def delete(self, request, pk=None): 
        employee_to_delete = Employee.objects.get(id=pk) 
        employee_to_delete.delete() 
        return JsonResponse("Employee Deleted Successfully", safe=False)