from django.urls import path

from . import views

urlpatterns = [

        path('',views.index, name ="index"),
        path('added/',views.Regular, name="add"),
        path('clear/',views.clear, name="clear"),
        path('cart/',views.Checkout_cart, name="cart")
]
