from .base import *

DEBUG = False
ALLOWED_HOSTS = ['https://gadget-kiosk.herokuapp.com/', 'gadget-kiosk.herokuapp.com', ]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db-name',
        'USER': 'db-username',
        'PASSWORD': 'db-password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
} 