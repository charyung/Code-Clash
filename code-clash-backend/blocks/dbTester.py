import psycopg2
import random
import time

# Columns in the order of: id, voteCount, winCount, code, winRate

conn = psycopg2.connect("dbname=mydb user=postgres password=abc123")
# Cursor is the object that Python uses to execute SQL commands
cur = conn.cursor()

def getEntries():
    ''' () -> tuple
    This function gets the 2 entries to compare and returns them.
    '''
    # First we get the size of the table. Note that this is really slow for really big databases so BE SURE TO USE ANOTHER METHOD BEFORE PUSHING THIS TO PRODUCTION OR WHATEVER.
    cur.execute("SELECT count(*) FROM ccTable")
    tblSize = cur.fetchone()[0]

    #First, we generate a winrate threshold (number between 0 to 100, inclusive on both ends). Then, we sort by voteCount, getting the rows with the condition that its winrate is within 5 %pts of the generated number. We take the row with the lowest voteCount that in this result. Then we randomly get one from the same restricted table and show the user the two to compare.

    #Alternatively...
    #First, we sort by voteCount. Then, we take the least voted row and get its winRate. We get all the rows that are at or within 5 %pts of it. Then, we randomly pick one out of those and show the user the two to compare.

    cur.execute("SELECT * FROM ccTable ORDER BY voteCount ASC")
    leastVotedRow = cur.fetchone()

    lowerWinRateBound = max(0, leastVotedRow[0] - 5)
    upperWinRateBound = min(100, leastVotedRow[0] + 5)

    cur.execute("SELECT id FROM ccTable WHERE winRate >= %s OR winRate <= %s", (lowerWinRateBound, upperWinRateBound))
    
    restrictedList = cur.fetchall()
    otherId = random.randint(0, len(restrictedList) - 1)

    while (otherId == leastVotedRow[0]):
        otherId = random.randint(0, len(restrictedList) - 1)

    cur.execute("SELECT * FROM ccTable WHERE id = %s", (restrictedList[otherId][0],))
    otherRow = cur.fetchone()

    print(leastVotedRow[3], otherRow[3])
    return (leastVotedRow, otherRow)

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
while (True):
    entries = getEntries()
    userVote = input("l/r/e\n")
    if (userVote == "l"):
        vote(entries[0], entries[1])
    elif (userVote == "r"):
        vote(entries[1], entries[0])

#print(["(" + str(random.randint(0, 50)) + ")" for i in range(0, 94)])