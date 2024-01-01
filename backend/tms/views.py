from django.shortcuts import render
from .models import Tm
from .serializers import TmSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import Http404, JsonResponse

# Create your views here.    
class TmView(APIView):


    def get_tm(self, pk):
        try:
            tm = Tm.objects.get(id=pk)
            return tm
        except:
            return JsonResponse("Tm Does Not Exist", safe=False)
        
    def get(self, request, pk=None):
        if pk:
            data = self.get_tm(pk)
            serializer = TmSerializer(data)
        else:
            data = Tm.objects.all()
            serializer = TmSerializer(data, many=True)
        return Response(serializer.data)

    def post(self,request):
        data = request.data
        serializer = TmSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Tm Added Successfully", safe=False)
        return JsonResponse("Failed to Add Tm", safe=False)
    
    def put(self, request, pk=None):
        tm_to_update = Tm.objects.get(id=pk)
        serializer = TmSerializer(instance=tm_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Tm Updated Successfully", safe=False)      
        return JsonResponse("Failed To Update Tm", safe=False)

    def delete(self, request, pk=None):
        tm_to_delete = Tm.objects.get(id=pk)
        tm_to_delete.delete()
        return JsonResponse("Tm Deleted Succesfully", safe=False)

    