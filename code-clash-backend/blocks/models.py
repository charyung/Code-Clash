#import psycopg2
import random
from django.db import models

# Create your models here.
class BlockUtils():
	#def getEntries(allList):
		''' (list of tuples) -> tuple
		This function gets the 2 entries to compare and returns them.
		'''

		#First, we generate a winrate threshold (number between 0 to 1, inclusive on both ends). Then, we sort by voteCount, getting the rows with the condition that its winrate is within 5% of the generated number. We take the row with the lowest voteCount that in this result. Then we randomly get one from the same restricted table and show the user the two to compare.

		'''winRateThreshold = allList[random.randint(0, len(allList) - 1)][4]
		restrictedList = []
		winRateScope = 0
		
		while (len(restrictedList) < 2):
			winRateScope += 1
			lowerWinRateBound = max(0, winRateThreshold - (0.05 * winRateScope))
			upperWinRateBound = min(1, winRateThreshold + (0.05 * winRateScope))

			restrictedList = [row for row in allList if (row[4] >= lowerWinRateBound and row[4] <= upperWinRateBound)]

		restrictedList.sort(key=lambda row: row[4])
	 
		firstRow = restrictedList[0]

		otherId = random.randint(1, len(restrictedList) - 1)

		otherRow = restrictedList[otherId]

		print(firstRow[3], otherRow[3])
		return (firstRow, otherRow)'''

class Block(models.Model):
	'''
	The name is perhaps misleading, but I couldn't think of a better one.
	This is a single piece of code submitted by a person.
	'''
	voteCount = models.IntegerField()
	winCount = models.IntegerField()
	code = models.TextField()
	winRate = models.PositiveSmallIntegerField()