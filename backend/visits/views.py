from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Visit
from .serializers import VisitSerializer
from django.http.response import Http404, JsonResponse
from rest_framework.generics import RetrieveAPIView
from rest_framework import status
from django.db.models import Count





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
            data = Visit.objects.all().order_by('-checkin')
            # data = Visit.objects.all()
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

class TotalVisitsView(RetrieveAPIView):
    queryset = Visit.objects.all()

    def retrieve(self, request, *args, **kwargs):
        total_visits = self.get_queryset().count()
        return Response({'total_visits': total_visits}, status=status.HTTP_200_OK)
    
class VisitTypeDataView(APIView):
    def get(self, request, *args, **kwargs):
        visit_type_data = Visit.objects.values('visit_type').annotate(count=Count('visit_type'))
        return Response({'visit_types': list(visit_type_data)}, status=status.HTTP_200_OK)

class PurposeDataView(APIView):
    def get(self, request, *args, **kwargs):
        purpose_data = Visit.objects.values('purpose').annotate(count=Count('purpose'))
        return Response({'purposes': list(purpose_data)}, status=status.HTTP_200_OK)


class HostVisitorDataView(APIView):
    def get(self, request, *args, **kwargs):
        # Fetch data from the Visit model, grouping by host and counting the number of visitors
        host_visitor_data = Visit.objects.values('host').annotate(visitor_count=Count('visitor'))

        # Convert the queryset to a list of dictionaries
        data_list = list(host_visitor_data)

        # Return the data as JSON
        return Response({'host_visitor_data': data_list})