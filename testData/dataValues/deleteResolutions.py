#!/usr/bin/python

import api

def loadDataSet(fileName):
    file = open(fileName, "r")
    queries = file.readlines()

    for query in queries:
        if query[0]=='#':
            break
        api.delete('dataValues.json/'+query.rstrip())

loadDataSet('./data/deleteResolutions.txt')