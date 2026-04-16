#!/bin/bash
if [ $? -eq 0 ]
then
 echo "The way is open! Going to buy a laptop now."
sudo apt install -y htop
else
 echo "The way is blocked! Sending a message to Aaron..."
echo "MESSAGE: i am stuck in traffic,cannot buy the laptop today."
fi
