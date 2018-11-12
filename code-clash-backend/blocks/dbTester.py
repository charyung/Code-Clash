import psycopg2
import random

conn = psycopg2.connect("dbname=mydb user=postgres password=abc123")
cur = conn.cursor()

cur.execute("SELECT * FROM t1;")
db_version = cur.fetchall()
print(db_version)

while(true):
	