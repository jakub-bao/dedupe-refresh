#!/usr/bin/bash

section(){
  echo ----------------------------
  echo $1
}

section Users \> Adding test user accounts
(cd users && ./persistUsers.py)

section DataStore \> Opening data entry periods for dedupes
(cd dataStore && ./dataStore.py)

section DataSets \> Opening dataset future periods
(cd dataSets && ./dataSets.py)

section DataValues \> Submitting form data
(cd dataValues && ./dataValues.py)
