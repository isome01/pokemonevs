import csv
import json

with open('./data/poke_evs.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')

    data = []
    headers = []
    for row in reader:
        obj = {}
        if not headers:
            headers = row
        else:
            for i in range(len(headers)):
                if headers[i] == 'ev_yield':
                    obj[headers[i]] = []
                    ev_yields = row[i].split('/')  # split if multiple ev yields
                    for y in ev_yields:
                        # trim any leading spaces
                        if y[0] == ' ':
                            y = y[1:]
                        obj[headers[i]].append(y)
                else:
                    obj[headers[i]] = row[i]
            data.append(obj)

    with open('./data/poke_evs.json', 'w') as json_file:
        json.dump(data, json_file)
