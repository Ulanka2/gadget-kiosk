from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    help = 'Renames Django Project'

    def add_arguments(self, parser):
        parser.add_argument('current', type=str, nargs='+',
                            help='The Current Django Project Folder Name')
        parser.add_argument('new', type=str, nargs='+',
                            help='The New Django Project Name')

    def handle(self, *args, **kwargs):
        current_project_name = kwargs['current'][0]
        new_project_name = kwargs['new'][0]

        # logic to rename project
        files_to_rename = [f'{current_project_name}/settings/base.py',
                            f'{current_project_name}/wsgi.py', 'manage.py']

        for f in files_to_rename:
            with open(f, 'r') as file:
                filedata = file.read()
            
            filedata = filedata.replace(current_project_name, new_project_name)

            with open(f, 'w') as file:
                file.write(filedata)
        
        os.rename(current_project_name, new_project_name)

        self.stdout.write(self.style.SUCCESS(f'Project has been renamed to {new_project_name}'))