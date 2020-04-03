#!/usr/bin/python

import api

file = open("./data.txt", "r")
queries = file.readlines()

for query in queries:
    api.formPost('dataValues', query.rstrip())
