from django.urls import path

from . import views

urlpatterns = [

        path('',views.index, name ="index"),
        path('added/',views.Regular, name="add"),
        path('addeds/', views.Sicillian, name="adds"),
        path('clear/',views.clear, name="clear"),
        path('subs/',views.Subs, name="subs"),
        path('pasta/',views.Pasta, name="pasta"),
        path('dine/',views.Dine, name="dine"),
        path('salad/',views.Salad, name="salad"),
        path('cart/',views.Checkout_cart, name="cart")
]
