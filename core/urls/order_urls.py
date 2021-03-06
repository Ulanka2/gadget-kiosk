from django.urls import path
from ..views.order_views import (
    addOrderItems, getMyOrders, 
    getOrderById, updateOrderToPaid,
    getOrders, updateOrderToDelivered
)

urlpatterns = [
    path('', getOrders, name='user-orders'),
    path('add/', addOrderItems, name='orders-add'),

    path('myorders/', getMyOrders, name='user-orders'),

    path('<str:pk>/delivered/', updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/', getOrderById, name='user-order'),
    path('<str:pk>/pay/', updateOrderToPaid, name='pay-order'),
]
