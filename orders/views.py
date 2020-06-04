from django.shortcuts import render,HttpResponse, redirect
from .models import Menu
from django.urls import reverse
from orders.models import Menu,Order,RegularPrice,SicillianPrice,Cart,AddressBook
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.conf import settings
from .forms import AddressForm
from django.views.decorators.csrf import csrf_exempt

import stripe


stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.api_version = settings.STRIPE_API_VERSION

# // main /////
def index(request):

    context = {
        'username': request.user,
        'Reg_tops': Menu.objects.all().filter(menucategory='Regular',special=False),
        'Reg_spec': Menu.objects.all().filter(menucategory='Regular',special=True),
        'Sci_tops': Menu.objects.all().filter(menucategory='Sicillian',special=False),
        'Sci_spec': Menu.objects.all().filter(menucategory='Sicillian',special=True),
        'Subs': Menu.objects.all().filter(menucategory='Subs'),
        'Pasta': Menu.objects.all().filter(menucategory='Pasta'),
        'Salad': Menu.objects.all().filter(menucategory='Salad'),
        'Dinner': Menu.objects.all().filter(menucategory='Dinner'),
        'cart':Cart.objects.all().filter(order_status = False,user=str(request.user))
        }


    return render(request,"orders/index.html",context)

# ///////    Payment Section  /////////////
@login_required
@csrf_exempt
def get_key(request):
    if request.method == 'POST':
        return JsonResponse({"KEY":settings.STRIPE_PUBLISHABLE_KEY})
    else:
        return HttpResponse("You are lost")

def get_amount(request):
    return cart.Total

def pay(request):
    data = request.POST
    cart= Cart.objects.all().filter(user=str(request.user), order_status = False).first()

    try:
            if 'paymentMethodId' in data:
                order_amount = cart.Total*100
                intent = stripe.PaymentIntent.create(
                    amount= int(cart.Total * 100),
                    description= "Init test",
                    currency = 'usd',
                    payment_method= data['paymentMethodId'],
                    confirmation_method='manual',
                    confirm=True,
                    use_stripe_sdk= True if 'useStripeSdk' in data else None
                    )
            #print(generate_response(intent))
            return generate_response(intent)
    except stripe.error.CardError as e:
        return JsonResponse({'error':e.user_message})


def generate_response(intent):
    status = intent['status']
    if status == 'requires_action' or status == 'requires_source_action':
        return JsonResponse({'requiresAction': True, 'paymentIntentId':intent['id'], 'clientSecret': intent['client_secret']})

    elif status == 'requires_payment_method' or status == 'requires_source':
        return JsonResponse({'error':'Your card was denied, please provide a new payment method'})

    elif status == 'succeeded':
        #print("payment recieved")
        return JsonResponse({'clientSecret':intent['client_secret']})

@csrf_exempt
def on_complete(request):
    order = Cart.objects.all().filter(user=str(request.user), order_status = False).first()
    if request.method == 'POST':
        order.order_status = True
        order.save()
        return redirect(reverse("index"))
    else:
        return HttpResponse("You are lost biyatch!! Get the fuck out of here")

def orders(request):
    order = Cart.objects.all().filter(user=str(request.user), order_status = True)
    return render(request,"orders/orders.html",{'carts':order})
# ////  Index routes section    //////////

def Regular(request):
    item_selections =request.POST
    items = {}
    #print(item_selections)
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
        od = Order(1,*order)
    else:
        od = Order(Order.objects.last().id+1,*order)


    if Cart.objects.all().filter(order_status=False,user=str(request.user)).last() == None:
        if Cart.objects.last() == None:
            cart = Cart(1,user = str(request.user))

        else:
            cart = Cart(Cart.objects.last().id + 1,user = str(request.user))

        cart.save()
    else:
        cart = Cart.objects.all().filter(order_status=False,user = str(request.user)).first()


    od.order_total = round(get_price(items,RegularPrice),2)
    od.save()
    cart.stuff.add(od)
    cart.Total += od.order_total
    cart.save()
    return HttpResponse("r-updated!")

def Sicillian(request):
    item_selections =request.POST
    items = {}
    #print(item_selections)
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
        od = Order(1,*order)
    else:
        od = Order(Order.objects.last().id+1,*order)

    if Cart.objects.all().filter(user =str(request.user),order_status=False).last() == None:
        if Cart.objects.last() == None:
            cart = Cart(1,user =str(request.user))

        else:
            cart = Cart(Cart.objects.last().id + 1,user =str(request.user))

        cart.save()
    else:
        cart = Cart.objects.all().filter(user =str(request.user),order_status=False).first()

    od.order_total = round(get_price(items,SicillianPrice),2)
    od.save()
    cart.stuff.add(od)
    cart.Total += od.order_total
    cart.save()
    return HttpResponse("s-updated!")


def Subs(request):
    item_selections = request.POST
    print(len(item_selections))
    if len(item_selections) != 1:
                Total_cost = 0.0

                if Order.objects.last() == None:
                    od = Order(1)
                else:
                    od = Order(Order.objects.last().id+1)

                od.save()
                for i in item_selections.getlist("subs"):
                    obj = Menu.objects.all().filter(id=i)
                    if i in item_selections.getlist("subs_size"):
                            Total_cost += obj[0].Price_large
                    else:
                        Total_cost += obj[0].Price_small
                    od.Others.add(obj[0])
                od.order_total = Total_cost
                od.save()
                if Cart.objects.all().filter(user =str(request.user),order_status=False).last() == None:
                    if Cart.objects.last() == None:
                        cart = Cart(1,user =str(request.user))

                    else:
                        cart = Cart(Cart.objects.last().id + 1,user =str(request.user))

                    cart.save()
                else:
                    cart = Cart.objects.all().filter(user =str(request.user),order_status=False).first()

                cart.stuff.add(od)
                cart.Total += Total_cost
                cart.save()

                return JsonResponse({"output":"Nope"})
    else:
        print('exiting')
        return JsonResponse({"output":"Fail"})

def Dine(request):
    item_selections = request.POST
    if len(item_selections)!=1:
            Total_cost = 0.0

            if Order.objects.last() == None:
                od = Order(1)
            else:
                od = Order(Order.objects.last().id+1)

            od.save()
            for i in item_selections.getlist("dinner"):
                obj = Menu.objects.all().filter(id=i)
                if i in item_selections.getlist("dinner_size"):
                    Total_cost += obj[0].Price_large
                else:
                    Total_cost += obj[0].Price_small
                od.Others.add(obj[0])
            od.order_total = Total_cost
            od.save()
            if Cart.objects.all().filter(user =str(request.user),order_status=False).last() == None:
                if Cart.objects.last() == None:
                    cart = Cart(1,user =str(request.user))

                else:
                    cart = Cart(Cart.objects.last().id + 1,user =str(request.user))

                cart.save()
            else:
                cart = Cart.objects.all().filter(user =str(request.user),order_status=False).first()

            cart.stuff.add(od)
            cart.Total += Total_cost
            cart.save()

            return JsonResponse({"output":"Nope"})
    else:
        print('exiting')
        return JsonResponse({"output":"Fail"})

def Salad(request):
    item_selections = request.POST
    if len(item_selections) !=1:
            Total_cost = 0.0

            if Order.objects.last() == None:
                od = Order(1)
            else:
                od = Order(Order.objects.last().id+1)

            od.save()
            for i in item_selections.getlist("salad"):
                obj = Menu.objects.all().filter(id=i)
                Total_cost += obj[0].Price_small
                od.Others.add(obj[0])
            od.order_total = Total_cost
            od.save()
            if Cart.objects.all().filter(user =str(request.user),order_status=False).last() == None:
                if Cart.objects.last() == None:
                    cart = Cart(1,user =str(request.user))

                else:
                    cart = Cart(Cart.objects.last().id + 1,user =str(request.user))

                cart.save()
            else:
                cart = Cart.objects.all().filter(user =str(request.user),order_status=False).first()

            cart.stuff.add(od)
            cart.Total += Total_cost
            cart.save()

            return JsonResponse({"output":"Nope"})
    else:
        return JsonResponse({"output":"Fail"})

def Pasta(request):
    item_selections = request.POST
    if len(item_selections) !=1:
            Total_cost = 0.0

            if Order.objects.last() == None:
                od = Order(1)
            else:
                od = Order(Order.objects.last().id+1)

            od.save()
            for i in item_selections.getlist("pasta"):
                obj = Menu.objects.all().filter(id=i)
                Total_cost += obj[0].Price_small
                od.Others.add(obj[0])
            od.order_total = Total_cost
            od.save()
            if Cart.objects.all().filter(user = str(request.user),order_status=False).last() == None:
                if Cart.objects.last() == None:
                    cart = Cart(1,user =str(request.user))

                else:
                    cart = Cart(Cart.objects.last().id + 1,user = str(request.user))

                cart.save()
            else:
                cart = Cart.objects.all().filter(user = str(request.user),order_status=False).first()

            cart.stuff.add(od)
            cart.Total += Total_cost
            cart.save()

            return JsonResponse({"output":"Nope"})

    else:
        return JsonResponse({"output":"Fail"})

# ////////        Cart Section  //////////
@login_required
def Checkout_cart(request):
    context = {
    'cart': Cart.objects.all().filter(user=str(request.user), order_status = False).first(),
    'form':AddressForm()
    }
    return render(request,"orders/cart.html",context)

@login_required
def address(request):
    if request.method == 'POST':
        print ("entered")
        form = AddressForm(request.POST)
        if form.is_valid():
            form.save()
            user = Cart.objects.all().filter(user=str(request.user), order_status = False).first()
            user.Ship_Add = AddressBook.objects.all().last()
            user.save()
            print("positive result")
            return JsonResponse({"output":"Yes"})
        else:
            print("negative result")
            return JsonResponse({"output":"Nope"})

    else:
        print("oops")
        return HttpResponse("Go back!")

@login_required
def clear(request):
    cart = Cart.objects.all().filter(user=str(request.user), order_status = False)
    cart_items = cart.first().stuff.all()
    id  = [i.id for i in cart_items]
    cart.delete()
    for i in id:
        Order.objects.all().filter(pk=i).delete()
    return redirect(reverse('index'))

# ///////  Helper Functions         ///////
def get_price(items,tag):
    r = tag.objects.first()
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
                #print(lg_price[i+1])
                total += lg_price[i+1]#test6
            else:
                #print(sm_price[i+1])
                total += sm_price[i+1]#test7

    return total
