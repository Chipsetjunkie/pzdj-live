from django.contrib import admin

from .models import Menu,RegularPrice,SicillianPrice
#admin.site.register(test)

admin.site.register(Menu)
admin.site.register(RegularPrice)
admin.site.register(SicillianPrice)
