#!/bin/bash
touch farm_records.txt
cp farm_records.txt backup_records.txt
if [ $? -eq 0 ]
then 
    echo " SUCCESS: the copy worked (Exit Code 0)."
    echo " Now it is safe to delete the orignial file."
rm farm_records.txt
else
   esho "ERROR: Backup failed!Keeping the original file safe."
   exit 1
fi
ls -l backup_records.txt
