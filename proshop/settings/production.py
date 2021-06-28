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
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_QUERYSTRING_AUTH = False
AWS_DEFAULT_ACL = 'public-read'


DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

django_heroku.settings(locals())