from django.shortcuts import render,HttpResponse, redirect
from .models import Menu
from django.urls import reverse
from orders.models import Menu,Order,Cart,RegularPrice
from django.http import JsonResponse


# Create your views here.
def index(request):
    print(request.user)
    context = {
        'username': request.user,
        'Reg_tops': Menu.objects.all().filter(menucategory='Regular',special=False),
        'Reg_spec': Menu.objects.all().filter(menucategory='Regular',special=True),
        'cart': Cart.objects.all().filter(user=request.user, order_status = False)
    }

    return render(request,"orders/index.html",context)


def Regular(request):
    item_selections =request.POST
    items = {}
    order = [None,None,None,None,None]
    for i in ["base","items","specials"]:
        if i in item_selections:
            if i == "base":
                order[0] = item_selections.getlist(i)[0]
            elif i == "items":
                for n in range(len(item_selections.getlist(i))):
                    order[1+n] = item_selections.getlist(i)[n]
            else:
                order[-1] = item_selections.getlist(i)[0]

    if "specials" in item_selections:
        if "specials_size" in item_selections:
            items['specials']= ["specials","specials_size",item_selections["specials"]]
        else:
            items['specials']=["specials",item_selections["specials"]]
    else:
        items['specials']=[]

    if "base" in item_selections:
        if "base_size" in item_selections:
            items['base']= ["base","base_size",item_selections["base"]]
        else:
            items['base']=["base",item_selections["base"]]
    else:
        items['base'] = []

    if "items" in item_selections:
        toppings = [int(i) for i in item_selections.getlist("items")]
        if "items_size" in item_selections:
            selection =[int(i) for i in item_selections.getlist("items_size")]
            items['toppings']= [toppings,selection]
        else:
            items['toppings']=[toppings]
    else:
        items['toppings']=[]

    if Order.objects.last() == None:
        od = Order(1,None,*order)
    else:
        od = Order(Order.objects.last().id+1,*order)

    od.save()
    if Cart.objects.all().filter(user = request.user).last() == None:
        if Cart.objects.last() == None:
            cart = Cart(1,user = request.user)

        else:
            cart = Cart(Cart.objects.last().id + 1,user = request.user)

        cart.save()
    else:
        cart = Cart.objects.all().filter(user = request.user).first()

    Total = round(round(get_price(items),2) + cart.order_total,2)
    cart.stuff.add(od)
    cart.order_total = Total
    cart.save()
    #print("added!!")
    #return redirect(reverse('index'))
    return JsonResponse({"data":updated_data(request)})

'''
def json_test(request):
    return JsonResponse({"success":True,"data":[1,2,3,4]})
'''

def Checkout_cart(request):
    context = {
    'cart': Cart.objects.all().filter(user=request.user, order_status = False).first()
    }
    return render(request,"orders/cart.html",context)

## Clear cart
def clear(request):
    cart = Cart.objects.all().filter(user=request.user, order_status = False)
    cart_items = cart.first().stuff.all()
    id  = [i.id for i in cart_items]
    cart.delete()
    for i in id:
        Order.objects.all().filter(pk=i).delete()
    return redirect(reverse('index'))

## Helper Functions
def get_price(items):
    r = RegularPrice.objects.first()
    sm_price = r.get_small()
    lg_price = r.get_large()
    sel = []
    total = 0
    base = items["base"]
    spec = items["specials"]
    item = items["toppings"]

    #Base
    if "base-size" in base:
        total += lg_price[0]
    elif "base" in base:
        total += sm_price[0]

    if "specials_size" in spec:
        total += lg_price[-1]
    elif "specials" in spec:
        total += sm_price[-1]

    # Toppings total #test2
    if len(item) == 0:
        total += 0

    elif len(item)==1: #test3
        total += sum(sm_price[1:1+len(item[-1])])

    else:#test4
        for i in range(len(item[0])): #test5
            if (item[0][i] in item[1]):
                print(lg_price[i+1])
                total += lg_price[i+1]#test6
            else:
                print(sm_price[i+1])
                total += sm_price[i+1]#test7
    return total


def updated_data(request):
    a = Cart.objects.all().filter(user=request.user, order_status = False).first()
    result_str = [[i.Base.menucategory,str(i)] for i in a.stuff.all()]
    return result_str
