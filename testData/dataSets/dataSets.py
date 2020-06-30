#!/usr/bin/python3

import api

update = {"openFuturePeriods": "1"}
api.patch('dataSets/qzVASYuaIey', update)
