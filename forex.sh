#!/bin/bash
mkdir /home/ireng/forex_trading
if [ $? -eq 0 ]
then
   echo "SUCCESS: Folder created. Now writting the log file..."
   echo "Forex log - Started March 2026" > /home/ireng/forex_trading/march_logs.txt
   echo "Strategy: Fibonacci Retracement" >> /home/ireng/forex_trading/march_logs.txt
   echo "Document created and text inserted!"
else
   echo "ERROR: Could not create folder. Maybe it already exists?"
exit 1
fi
cat /home/ireng/forex_trading/march_logs.txt
