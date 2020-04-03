#!/usr/bin/python

import api

update = {"openFuturePeriods": "1"}
api.patch('dataSets/qzVASYuaIey', update)
