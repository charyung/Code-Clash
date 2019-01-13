from django.db import models

# Create your models here.
class Block(models.Model):
	'''
	The name is perhaps misleading, but I couldn't think of a better one.
	This is a single piece of code submitted by a person.
	'''
	voteCount = models.IntegerField()
	winCount = models.IntegerField()
	code = models.textField()
	winRate = models.PositiveSmallIntegerField()