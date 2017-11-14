#!/bin/sh
find . -type f | grep png | sed s/\.png$//g | xargs -IXXXX -L 1 convert XXXX.png -quality 100 XXXX.jpg
