from django.contrib import admin

from oakbike.models import Report

class PageAdmin(admin.ModelAdmin):
    list_display = ('id', 'lat', 'lng')
    list_display_links = ('id', 'lat')
    search_fields = ('lat', 'lng')
    list_per_page = 25

admin.site.register(Report, PageAdmin)
