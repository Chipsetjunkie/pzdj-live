from django.urls import path
from django.contrib.auth import views as Views
from . import views

urlpatterns = [

        path("register/",views.register, name="register"),
        path("login/",Views.LoginView.as_view(template_name="Accounts/login.html"),name="login"),
        path("logout/",Views.LogoutView.as_view(template_name="Accounts/logout.html"),name="logout")
]
