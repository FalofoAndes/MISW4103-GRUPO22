#!/bin/bash

npx http-server ../screenshots/ >> /dev/null 2>&1 &

sleep 2

npx backstop reference
npx backstop test

pkill http-server


