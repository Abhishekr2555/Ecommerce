from django.db import models
from django.core.mail import send_mail
# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=10)
    email = models.EmailField()
    message = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

    # def save(self,*args,**kwargs):
    #     send_mail(
    #         "Subject here",
    #         "Here is the message.",
    #         "from@example.com",
    #         [self.email],
    #         fail_silently=False,
    #         html_content = f"<p>{self.name}</p><p>{self.message}</p>"
    #     )
    #     return super(Contact,self).save(*args, **kwargs)