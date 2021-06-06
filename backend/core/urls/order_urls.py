from django.urls import path
from ..views.order_views import addOrderItems

urlpatterns = [
    path('add/', addOrderItems, name='orders-add'),
]
