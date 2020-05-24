from django.shortcuts import render,HttpResponse,redirect
from .form import RegisterationForm
# Create your views here.
def register(request):
    if request.method== 'POST':
        data = RegisterationForm(request.POST)
        if data.is_valid():
            data.save()
            return redirect('login')
        else:
            return HttpResponse("Something went wrong")

    else:
        data = RegisterationForm()
        return render(request,"Accounts/register.html",{'form':data})
