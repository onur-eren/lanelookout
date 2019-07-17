from django.contrib import admin

from oakbike.models import Report

class PageAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_created', 'lat', 'lng', 'description', 'type_incident', 'has_image', )
    list_display_links = ('id', )
    list_per_page = 25
    ordering = ('-date_created', )

    def has_image(self, obj):
        return bool(obj.img_url)

admin.site.register(Report, PageAdmin)

