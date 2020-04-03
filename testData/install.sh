#!/usr/bin/bash

section(){
  echo ----------------------------
  echo $1
}

section DataStore \> Opening data entry periods for dedupes
(cd dataStore && ./dataStore.py)

section DataValues \> Submitting form data
(cd dataValues && ./dataValues.py)

section Users \> Adding test user accounts
(cd users && ./persistUsers.py)