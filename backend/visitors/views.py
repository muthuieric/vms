from django.shortcuts import render
from .models import Visitor
from .serializers import VisitorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import Http404, JsonResponse


# Create your views here.    
class VisitorView(APIView):

    def get_visitor(self, pk):
        try:
            visitor = Visitor.objects.get(id=pk)
            return visitor
        except Visitor.DoesNotExist:
            return JsonResponse("Visitor Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_visitor(pk)
            serializer = VisitorSerializer(data)
        else:
            data = Visitor.objects.all()
            serializer = VisitorSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = VisitorSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Visitor Added Successfully", safe=False)
        return JsonResponse("Failed to Add Visitor", safe=False)

    def put(self, request, pk=None):
        visitor_to_update = Visitor.objects.get(id=pk)
        serializer = VisitorSerializer(instance=visitor_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Visitor Updated Successfully", safe=False)
        return JsonResponse("Failed To Update Visitor", safe=False)

    def delete(self, request, pk=None):
        visitor_to_delete = Visitor.objects.get(id=pk)
        visitor_to_delete.delete()
        return JsonResponse("Visitor Deleted Successfully", safe=False)


