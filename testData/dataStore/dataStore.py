#!/usr/bin/python

import api

def fetchDataStore():
    return api.get('dataStore/dedupe/periodSettings', {})

def fixDates(dataStore):
    lateDate = "2025-01-01T00:00:00+00:00"
    dataStore["RESULTS"]["2019Q3"]["end"] = lateDate
    dataStore["RESULTS"]["2019Q4"]["end"] = lateDate
    dataStore["TARGETS"]["2019Oct"]["end"] = lateDate
    dataStore["TARGETS"]["2020Oct"]["end"] = lateDate
    return dataStore

def saveDataStore(dataStore):
    api.put('dataStore/dedupe/periodSettings', dataStore)

dataStore = fetchDataStore()
dataStore = fixDates(dataStore)
saveDataStore(dataStore)