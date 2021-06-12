from django.urls import path

from core.views.product_views import (
    getProducts, getProduct, deleteProduct,
    createProduct, updateProduct, image_upload
)

urlpatterns = [
    path('', getProducts, name='products'),
    path('create/', createProduct, name='product-create'),
    path('image-upload/', image_upload, name='image'),

    path('<str:pk>/', getProduct, name='product'),

    path('update/<str:pk>/', updateProduct, name='product-update'),
    path('delete/<str:pk>/', deleteProduct, name='product-delete'),
]