# Pruebas de regresón visual con Backstop

Las pruebas de regresión visual se realizan con BackstopJS v6.3.23. Adicionalmente se usa http-server v14.1.1 para poder realizar las comparaciones correspondientes con backstop. Para ejecutar las pruebas, abra una terminal de comando en el mismo directorio de este archvo, y ejecute los siguientes comandos: 

```
npm install
```

## Ejecución en Ubuntu
Para ejecutar el proyecto en Ubuntu se puede ejecutar el siguiente script: 


```
./run_vrt.sh 
```
## Ejecución en Windows
Tener instalado el servicio http-server, ó instalarlo mediante el comando 
```
npm install -g http-server
```

En consola moverse a la carpeta donde están los screenshots
Iniciar el servidor HTTP con el comando

```
npx http-server
```

Mover a la carpeta MISW4103-GRUPO22\regresion-testing-backstop\backstop
ejecutar 
```
npx backstop reference
npx backstop test
```
## Ejecución manual

Y luego 
```
npx http-server ../screenshots/
```

Y luego abrir una nueva terminal, y luego
```
npx backstop reference
npx backstop test
```
