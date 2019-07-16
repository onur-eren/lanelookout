from django.contrib import admin

from oakbike.models import Report

class PageAdmin(admin.ModelAdmin):

    list_display = ('id', 'date_created', 'lat', 'lng', 'description') # 'obstruction_type' 
    list_display_links = ('id', )
    list_per_page = 25

admin.site.register(Report, PageAdmin)

