#!/bin/bash
if [ $? -ne 0 ]
then
   echo "STOP: The farm folder is missing. Check the path!"
   exit 1
else
   echo "SUCCESS: folder found. Proceeding with work..."
fi
