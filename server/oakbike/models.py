import uuid

from django.db import models


class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    img_url = models.CharField(max_length=256, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
