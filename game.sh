#!/bin/bash
echo "Welcome tarnished. Please select your starting class:
1 - Samurai
2 - Prisoner
3 - Prophet"
read class

if [[ class == 1 ]]; then
        type="Samurai"
        hp=10
        attack=11
        magic=12
elif [[ class == 2 ]]; then
        type == "Prisoner"
        hp=13
        attack=4
        magic=12
echo "You Died"
fi
