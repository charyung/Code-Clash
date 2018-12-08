import psycopg2
import random
import time

# Columns in the order of: id, voteCount, winCount, code, winRate

conn = psycopg2.connect("dbname=mydb user=postgres password=abc123")
# Cursor is the object that Python uses to execute SQL commands
cur = conn.cursor()

def getEntries(allList):
    ''' (list of tuples) -> tuple
    This function gets the 2 entries to compare and returns them.
    '''

    #First, we generate a winrate threshold (number between 0 to 100, inclusive on both ends). Then, we sort by voteCount, getting the rows with the condition that its winrate is within 5% of the generated number. We take the row with the lowest voteCount that in this result. Then we randomly get one from the same restricted table and show the user the two to compare.

    #I don't know how great the design really is, but it seems like getting the entire table then working with it in Python is faster than making a query every time.

    winRateThreshold = allList[random.randint(0, len(allList) - 1)][4]
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
    return (firstRow, otherRow)


    #cur.execute("SELECT * FROM ccTable ORDER BY voteCount ASC")
    #leastVotedRow = cur.fetchone()

    #lowerWinRateBound = max(0, leastVotedRow[0] - 5)
    #upperWinRateBound = min(100, leastVotedRow[0] + 5)

    #cur.execute("SELECT id FROM ccTable WHERE winRate >= %s OR winRate <= %s", (lowerWinRateBound, upperWinRateBound))
    
    #restrictedList = cur.fetchall()
    #otherId = random.randint(0, len(restrictedList) - 1)

    #while (otherId == leastVotedRow[0]):
    #   otherId = random.randint(0, len(restrictedList) - 1)

    #cur.execute("SELECT * FROM ccTable WHERE id = %s", (restrictedList[otherId][0],))
    #otherRow = cur.fetchone()

    #print(leastVotedRow[3], otherRow[3])
    #return (leastVotedRow, otherRow)

def vote(winningRow, losingRow):
    '''(tuple, tuple) -> void
    This function pretty much does what it says. It updates the info for the correct rows.
    '''
    cur.execute("UPDATE ccTable SET voteCount = %s, winCount = %s, winRate = %s WHERE id = %s", (winningRow[1] + 1,  winningRow[2] + 1, ((winningRow[2] + 1) / (winningRow[1] + 1)), winningRow[0]))
    cur.execute("UPDATE ccTable SET voteCount = %s, winCount = %s, winRate = %s WHERE id = %s", (losingRow[1] + 1,  losingRow[2], (losingRow[2] / (losingRow[1] + 1)), losingRow[0]))
    conn.commit()

#cur.execute("SELECT * FROM t1;")
#db_version = cur.fetchall()
#print(db_version)

#print(["(" + str(random.randint(0, 50)) + ")" for i in range(0, 94)])
if (__name__ == "__main__"):
    cur.execute("SELECT * FROM ccTable")
    allList = cur.fetchall()

    while (True):
        entries = getEntries(allList)
        userVote = input("l/r/e\n")
        if (userVote == "l"):
            vote(entries[0], entries[1])
        elif (userVote == "r"):
            vote(entries[1], entries[0])