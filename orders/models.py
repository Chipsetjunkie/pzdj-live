from django.db import models
import re
# Create your models here


class Menu(models.Model):
    food_choices = [('Toppings','Tops'), ('Subs','Subs'), ('Pasta','Pasta'), ('Salad','Salad'), ('Dinner','Dine'), ('Base','base')]
    menu_choices = [('Regular','Reg'),('Sicillian','Sic'),('Subs','subs'),('Pasta','pas'),('Salad','sal'),('Dinner','Dine')]

    name =models.CharField(max_length = 120)
    special = models.BooleanField(default = False)
    foodcategory = models.CharField(max_length = 25, choices=food_choices)
    menucategory = models.CharField(max_length = 25, choices=menu_choices)
    Price_small = models.FloatField(null=True, blank=True)
    Price_large = models.FloatField(null=True, blank=True)
    def __str__(self):
        return self.name



class Order(models.Model):
    Base = models.ForeignKey(Menu,on_delete=models.CASCADE,null=True,blank=True,related_name= "Base")
    item_1 = models.ForeignKey(Menu,on_delete=models.CASCADE,null=True,blank=True,related_name = "item_1")
    item_2 = models.ForeignKey(Menu,on_delete=models.CASCADE,null=True,blank=True,related_name = "item_2")
    item_3 = models.ForeignKey(Menu,on_delete=models.CASCADE,null=True,blank=True,related_name="item_3")
    Special = models.ForeignKey(Menu,on_delete=models.CASCADE,null=True,blank=True,related_name="special_item")
    Others = models.ManyToManyField(Menu)
    order_total = models.FloatField(default= 0.0)

    def __str__(self):
            if self.Base == None:
                result="Fillings:"
                for i in self.Others.all():
                    result +=" "+i.name+","

                return result

            else:
                string = "Base:{0} | Toppings:{1}, {2}, {3} | special:{4} |".format(self.Base,self.item_1,self.item_2,self.item_3,self.Special)
                print(string)
                clean_string = re.sub(r"[A-Za-z]+:[None | None,{3}]+","",string).strip()[: -1]
                #print(clean_string)
                clean_string = re.sub(r",\sNone","",clean_string).strip()
                return clean_string

class AddressBook(models.Model):
    Name = models.CharField(max_length=32)
    Address = models.CharField(max_length=64)
    City = models.CharField(max_length=32)
    Postal_Code = models.CharField(max_length=32)
    Telephone = models.IntegerField()

    def __str__(self):
        return self.Name + "\n"+ self.Address + "\n"+self.City+"\n"+self.Postal_Code+"\n"+ str(self.Telephone)


class Cart(models.Model):
    user = models.CharField(null=True,blank=True,max_length= 32, unique=False)
    stuff = models.ManyToManyField(Order)
    order_status = models.BooleanField(default = False)
    Total = models.FloatField(default= 0.0)
    Ship_Add = models.ForeignKey(AddressBook,on_delete=models.CASCADE,null=True,blank=True,related_name="Shipping_address")

class RegularPrice(models.Model):
    Base_small = models.FloatField()
    item_1_small = models.FloatField()
    item_2_small = models.FloatField()
    item_3_small = models.FloatField()
    Special_small = models.FloatField()

    Base_large = models.FloatField()
    item_1_large = models.FloatField()
    item_2_large = models.FloatField()
    item_3_large = models.FloatField()
    Special_large = models.FloatField()

    def get_small(self):
        return [self.Base_small,self.item_1_small,self.item_2_small,self.item_3_small,self.Special_small]

    def get_large(self):
        return [self.Base_large,self.item_1_large,self.item_2_large,self.item_3_large,self.Special_large]

class SicillianPrice(models.Model):
    Base_small = models.FloatField()
    item_1_small = models.FloatField()
    item_2_small = models.FloatField()
    item_3_small = models.FloatField()
    Special_small = models.FloatField()

    Base_large = models.FloatField()
    item_1_large = models.FloatField()
    item_2_large = models.FloatField()
    item_3_large = models.FloatField()
    Special_large = models.FloatField()

    def get_small(self):
        return [self.Base_small,self.item_1_small,self.item_2_small,self.item_3_small,self.Special_small]

    def get_large(self):
        return [self.Base_large,self.item_1_large,self.item_2_large,self.item_3_large,self.Special_large]
