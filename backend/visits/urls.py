from django.urls import path
from .views import VisitView

urlpatterns = [
    path('visits/', VisitView.as_view(), name='visit-list'),
    path('visits/<int:pk>/', VisitView.as_view(), name='visit-list'),
]
