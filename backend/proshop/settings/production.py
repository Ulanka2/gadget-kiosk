from .base import *

DEBUG = False
ALLOWED_HOSTS = ['ip-address']

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