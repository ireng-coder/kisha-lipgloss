#!/bin/bash
read -p " What do you want to eat today?" ANSWER
if [[ $ANSWER == "matoke" ]];then
echo " It is available "
elif [[ $ANSWER == "meat" ]]; then
echo " Beef or Chicken? "
if [[ " Beef " == available ]]; then
echo "okay"
elif [[ $ANSWER == "greens" ]]; then
echo " Not available "
else 
echo " We don't have $ANSWER on the menu today."
fi
