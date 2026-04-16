#!/bin/bash
read -p " What do you want to eat today? " ANSWER
if [[ $ANSWER == "matoke" ]]; then
    echo " It is available "
elif [[ $ANSWER == "meat" ]]; then
    echo " You choose meat! "
    read -p " Do you want beef or chicken? " TYPE
    if [[ $TYPE == "beef" ]]; then
        echo " beef is ready in 10 munites."
    else
       echo " Chicken will take 20 minutes. "
    fi
elif [[ $ANSWER == "greens" ]]; then
      echo " Not available "
else
     echo " We don't have $ANSWER on the menu today. "
fi
