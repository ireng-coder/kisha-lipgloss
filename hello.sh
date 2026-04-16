#!/bin/bash
# This script creates a Daily Status Report
echo "--- DAILY STATUS REPORT ---"
echo "USER: $USER."
echo "DATE: $(date)"
echo "---------------------------"

read -p "What is the mission for today? " MISSION
echo " Understood. Today's mission is: $MISSION"

read -p "How many HOURS will this take? " HOURS
MINUTES="That is $MINUTES minutes of work. Let's get started!"

# THIS IS THE SAVE COMMAND:
echo "$(date): $USER completed $MISSION in $MINUTES minutes." >> mission_log.txt
