from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from core.models import Product, Review
from core.serializers import ProductSerializer


# GET/LIST ALL PRODUCTS
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keywords')
    print(query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getTopProducts(request):
    product = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)

# GET SINGLE PRODUCTS
@api_view(['GET'])
def getProduct(request, pk):
   products = Product.objects.get(_id=pk)
   serializers = ProductSerializer(products, many=False)
   return Response(serializers.data)

# DELETE PRODUCT BY AND ADMIN
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, many=False)

    product.delete()
    return Response("Post Deleted")

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data
    
    name = data['name']
    brand = data['brand']
    category = data['category']
    description = data['description']
    price = data['price']
    countInStock = data['countInStock']

    product_create = Product.objects.create(
        user=user, name=name, brand=brand,
        category=category, description=description,
        price=price, countInStock=countInStock
    )

    serializer = ProductSerializer(product_create, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data =request.data
    product = Product.objects.get(pk=pk)

    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.countInStock = data['countInStock']

    product.save()

    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def image_upload(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(pk=product_id)

    product.image = request.FILES.get('image')

    product.save()

    return Response('Image was saved')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    product = Product.objects.get(pk=pk)
    user = request.user
    data = request.data
    # SCENERIO

    #1 REVIEW ALREADY EXIST
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already Reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

#2 NO RATING OR 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

#3 CREATE REVIEW
    else:
        review = Review.objects.create(
            user=user,
            name=user.first_name,
            rating=data['rating'],
            product=product,
            comment=data['comment']
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()
        
        return Response('Review Added')