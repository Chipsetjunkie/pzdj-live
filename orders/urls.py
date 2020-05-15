from django.urls import path

from . import views

urlpatterns = [

        path('',views.index, name ="index"),
        path('added/',views.Regular, name="add"),
        path('added_s', views.Sicillian, name="adds"),
        path('clear/',views.clear, name="clear"),
        path('cart/',views.Checkout_cart, name="cart")
]
