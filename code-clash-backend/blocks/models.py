#import psycopg2
import random
from django.db import models
from django.db.models import Q

class Block(models.Model):
    '''
    The name is perhaps misleading, but I couldn't think of a better one.
    This is a single piece of code submitted by a person.
    '''
    voteCount = models.IntegerField()
    winCount = models.IntegerField()
    code = models.FileField()
    winRate = models.FloatField()
    
# Create your models here.
class BlockUtils():
    def getEntries():
        ''' (list of tuples) -> tuple
        This function gets the 2 entries to compare and returns them.
        '''

        #First, we generate a winrate threshold (number between 0 to 1, inclusive on both ends). Then, we sort by voteCount, getting the rows with the condition that its winrate is within 5% of the generated number. We take the row with the lowest voteCount that in this result. Then we randomly get one from the same restricted table and show the user the two to compare.
        
        blocksCount = Block.objects.count()
        firstBlock = Block.objects.get(pk=(random.randint(1, blocksCount)))
        
        winRateThreshold = firstBlock.winRate
        restrictedList = []
        winRateScope = 0
        
        while (len(restrictedList) < 2):
            winRateScope += 1
            lowerWinRateBound = max(0, winRateThreshold - (0.05 * winRateScope))
            upperWinRateBound = min(1, winRateThreshold + (0.05 * winRateScope))
            
            restrictedList = [row for row in Block.objects.filter(Q(winRate__lte=upperWinRateBound) | Q(winRate__gte=lowerWinRateBound)).order_by("voteCount")]
            
        firstRow = restrictedList[0]
        
        otherId = random.randint(1, len(restrictedList) - 1)

        otherRow = restrictedList[otherId]

        return (firstRow, otherRow)
        
    def vote(winningRow, losingRow):
        '''(int, int) -> void
        This function pretty much does what it says. It updates the info for the given rows.
        Each int is the id of the row.
        '''
        w = Block.objects.get(pk=winningRow)
        l = Block.objects.get(pk=losingRow)
        
        w.voteCount += 1
        w.winCount += 1
        w.winRate = w.winCount / w.voteCount
        
        l.voteCount += 1
        l.winRate = l.winCount / l.voteCount
		
        print(w.winRate)
        
        w.save()
        l.save()
        
    def getVote():
        '''
        Calls both getEntries and vote
        '''
        entries = BlockUtils.getEntries()
        
        userVote = input(entries[0].code + " " + entries[1].code + "\n")
        
        if (userVote == "l"):
            BlockUtils.vote(entries[0].id, entries[1].id)
        elif (userVote == "r"):
            BlockUtils.vote(entries[1].id, entries[0].id)
        
    def createCode(filesList):
        '''
        Creates a new code object in the database
        (???) -> void
        '''
        for file in filesList:
            block = Block.objects.create(0, 0, file, 0)
            block.save()