import uuid

from django.db import models

from django.db import forms

OBSTRUCTION_TYPES = ['Parking', 'Broken Road', 'Debris', 'Other']

class Report(models.Model, forms.Form):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    contact = models.CharField(max_length=256, blank=True)
    obstruction_type = forms.ChoiceField(required=False, widget=forms.CheckboxSelectMultiple, choices=OBSTRUCTION_TYPES)
    description = models.CharField(max_length=512, blank=True, required=False)
    img_url = models.CharField(max_length=256, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
