#!/bin/bash
echo "--- WELCOME TO MOLONI SECURE VAULT ---"
read -p "Enter Secret Password: " PASSWORD
read -p "Enter Clearance Level (1-10): " LEVEL
if [[ $PASSWORD == "shiba" || $PASSWORD == "SHIBA" ]]; then
    echo "ACCESS GRANTED. Welcome, C.E.O."
else 
    echo "ACCESS DENIED. Alarm triggered!"
fi
