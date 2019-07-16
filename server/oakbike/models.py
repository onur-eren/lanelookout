import uuid

from django.db import models
from django.utils.timezone import now

REPORT_TYPES = [
    ("H", "Pothole"),
    ("P", "Parking"),
    ("O", "Other")
]


class Report(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lat = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(
        max_digits=9, decimal_places=6, blank=True, null=True)
    contact = models.CharField(max_length=256, blank=True)
    description = models.CharField(max_length=512, blank=True)
    img_url = models.CharField(max_length=256, blank=True)
    date_created = models.DateTimeField(default=now)
    source = models.CharField(max_length=256, blank=True)
    report_type = models.CharField(
        max_length=1, blank=True, choices=REPORT_TYPES)
