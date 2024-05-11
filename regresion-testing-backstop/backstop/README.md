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
> TODO

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
