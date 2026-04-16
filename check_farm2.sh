#!/bin/bash
if [ -d /home/ireng/farm_data ]
then
  echo "SUCCESS: Farm data found. Starting backup..."
else
   echo "ERROR: /home/ireng/farm_data is missing!"
exit 1
fi
