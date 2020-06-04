from django import forms

from .models import AddressBook

class AddressForm(forms.ModelForm):

    class Meta:
        model = AddressBook
        fields = '__all__'

        widgets = {
                'Name': forms.TextInput(attrs={'placeholder':'Name'}),
                'Address': forms.Textarea(attrs={'rows':'8','cols':'30','placeholder':'Address...'}),
                'City': forms.TextInput(attrs={'placeholder':'City'}),
                'State': forms.TextInput(attrs={'placeholder':'State'}),
                'Postal_Code': forms.TextInput(attrs={'placeholder':'Postal Code'}),
                'Telephone':forms.TextInput(attrs={'placeholder':'Telephone'})
        }
