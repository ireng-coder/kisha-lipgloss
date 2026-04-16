#!/bin/bash
read -p "What is your name? " NAME
if [[ $NAME == "ireng" || $NAME == "IRENG" ]]; then
    echo "Welcome, Boss."
else
    echo "Access Denied."
fi
