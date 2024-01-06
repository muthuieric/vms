from django.urls import path
from .views import VisitView, TotalVisitsView, VisitTypeDataView, PurposeDataView, HostVisitorDataView

urlpatterns = [
    path('visits/', VisitView.as_view(), name='visit-list'),
    path('visits/<int:pk>/', VisitView.as_view(), name='visit-list'),
    path('total-visits/', TotalVisitsView.as_view(), name='total_visits'),
    path('visit-type-data/', VisitTypeDataView.as_view(), name='visit_type_data'),
    path('purpose-data/', PurposeDataView.as_view(), name='purpose_data'),
    path('host-visitor-data/', HostVisitorDataView.as_view(), name='host-visitor-data'),


]
