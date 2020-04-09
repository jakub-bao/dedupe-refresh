#!/usr/bin/python

import api

def loadDataSet(fileName):
    file = open(fileName, "r")
    queries = file.readlines()

    for query in queries:
        api.formPost('dataValues', query.rstrip())

loadDataSet('./data/rwanda.txt')
loadDataSet('./data/nigeria.txt')