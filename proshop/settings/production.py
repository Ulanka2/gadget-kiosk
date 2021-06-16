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

# WHITENOISE CONFIGURATION
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# AMAZON CONFIGURATIONS
AWS_ACCESS_KEY_ID = 'AKIAZQ7Z4VNLF2QL4OUU'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'gadget-kiosk'
AWS_QUERYSTRING_AUTH = False
AWS_DEFAULT_ACL = 'public-read'


DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

django_heroku.settings(locals())