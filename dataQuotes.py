import csv
from random import randrange

phrases=[]
with open ('data.csv', 'r') as file:
    csvFile = csv.reader(file)
    for lines in csvFile:
        l= lines[0:(len(lines)-1)]
        phrases.append(l)


randNum= randrange(0, len(phrases))
quote= phrases[randNum]

print(quote[0])


