#!/bin/bash
echo "A Boss appears! Pick a number between 0 and 1 (0=Dodge, 1=Attack):"
read move

# Generate a random 0 or 1
cpu_move=$(( $RANDOM % 2 ))

if [[ $move == $cpu_move ]]; then
    echo "CRITICAL HIT! You defeated the boss, C.E.O.!"
else
    echo "YOU DIED... again."
fi
