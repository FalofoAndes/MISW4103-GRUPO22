#!/bin/bash

# Levanta el servidor HTTP auxiliar 
npx http-server ../screenshots/ >> /dev/null 2>&1 &

# Delay de 2 sec 
sleep 2

# Ejecuta las referencias (v3.2.0 de Ghost)
npx backstop reference

# Ejecuta las pruebas de regresión
npx backstop test

# Finaliza el servidor HTTP auxliar
pkill http-server

