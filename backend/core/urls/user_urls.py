from django.urls import path


from core.views.user_views import (
    MyTokenObtainPairView, getUserProfile,
    getUsers, registerUser, updateUserProfile
)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', registerUser, name='register'),
    path('profile/', getUserProfile, name='users-profile'),
    path('profile/update/', updateUserProfile, name='users-profile=update'),
    path('', getUsers, name='users'),
]