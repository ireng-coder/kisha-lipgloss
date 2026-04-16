#!/bin/bash
MY_LOG="business_history.txt"
NOW=(date)
echo "What did you do today, Irenge?"
read USER_INPUT
echo "[$NOW] $USER_INPUT" >> $MY_LOG
echo "Record saved to $MY_LOG"
