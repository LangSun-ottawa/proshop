from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    print('Signals trigger')
    user = instance
    if user.email !=  "":
        user.name = user.email
        
    
pre_save.connect(updateUser, sender=User)
