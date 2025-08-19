from django.contrib import admin
from backend.models import Conversation

class details_conversation(admin.ModelAdmin):
   list_details=('user','send','receive','date', 'time','file')
admin.site.register(Conversation,details_conversation)
