#!/bin/bash
tool=/usr/bin/duf
if [[ -f "$tool" ]]; then
   echo "Tool found!"
else
   echo "Tool missing, Preparing to install..."
sleep 3
    sudo apt update && sudo apt install -y duf
fi
$tool

