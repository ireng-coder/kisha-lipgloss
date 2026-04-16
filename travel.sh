#!/bin/bash
read -p " Which country are you travelling too? " NAME
if [[ $NAME == "Uganda" ]];then
   echo " Welcome to the perl of Africa "
elif [[ $NAME == "DRC" ]]; then
   echo " Welcome to the heart of Africa "
elif [[ $NAME == "Tanzania" ]]; then
   echo " Karibu kwentu bongo "
elif [[ $NAME == "Kenya" ]]; then 
   echo " Kenya hakuna matata "
elif [[ $NAME == "China" ]]; then
   echo " Welcome to the Business World "
else
   echo " No corresponding country,Please try again later."
fi
