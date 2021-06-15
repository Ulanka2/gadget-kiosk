from .base import *
import django_heroku

DEBUG = False
ALLOWED_HOSTS = ['gadget-kiosk.herokuapp.com']

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'db-name',
#         'USER': 'db-username',
#         'PASSWORD': 'db-password',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

django_heroku.settings(locals())