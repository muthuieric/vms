from django.urls import path
from .views import TmView

urlpatterns = [
    path('tms/',TmView.as_view()),
    path('tms/<int:pk>/',TmView.as_view())
]