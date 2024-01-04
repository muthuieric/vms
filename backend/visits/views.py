from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Visit
from .serializers import VisitSerializer
from django.http.response import Http404, JsonResponse


# Create your views here.
class VisitView(APIView):
    def get_visit(self, pk):
        try:
            visit = Visit.objects.get(id=pk)
            return visit
        except Visit.DoesNotExist:
            return JsonResponse("Visit Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_visit(pk)
            serializer = VisitSerializer(data)
        else:
            data = Visit.objects.all()
            serializer = VisitSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = VisitSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Visit Added Successfully", safe=False)
        return JsonResponse("Failed to Add Visit", safe=False)

    def put(self, request, pk=None):
        visit_to_update = self.get_visit(pk)
        serializer = VisitSerializer(instance=visit_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Visit Updated Successfully", safe=False)
        return JsonResponse("Failed To Update Visit", safe=False)

    def delete(self, request, pk=None):
        visit_to_delete = self.get_visit(pk)
        visit_to_delete.delete()
        return JsonResponse("Visit Deleted Successfully", safe=False)
