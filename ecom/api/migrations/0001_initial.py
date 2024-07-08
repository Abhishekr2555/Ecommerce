from django.db import migrations
from api.user.models import CustomUser
# from django.contrib.auth.models import CustomUser  # Or your custom User model

# ...

# Creating a superuser

class Migration(migrations.Migration):

    def seed_data(apps, schema_editor):
        user = CustomUser(name='Abhishek9318',
                          email='abhishekrathod9318@gmail.com',
                          is_staff=True,
                          is_superuser=True,
                          is_active=True,
                          phone='8160906579',
                          gender='Male'
                        )

        user.set_password('12345')
        user.save()
       
    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
