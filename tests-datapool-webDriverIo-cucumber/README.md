# Pruebas E2E con generación de datos
Esta carpeta contiene un proyecto que emplea generación de datos, apriori, pseudo aleatorios y aleatorios para generar pruebas e2e en la aplicación cms Ghost en cumplimiento de sus funcionalidades. Para las pruebas automatizadas E2E de la aplicación se usará webdriverIo con el framework de cucumber para realizar tanto las pruebas automatizadas como el lenguaje de especifiación . Las versiones de los componentes usados son las siguientes:

- npm:10.5.1
- NodeJS:18.20
- faker: 6.6.6
- wdio: 8.36.1
- wdio-html-nice-reporter: 8.1.6
- ts-node: 10.9.2


Se ejecutaron las pruebas en las plataformas de Windows 11 y Windows 10.

### Pasos para instalar las dependencias:

Desde la carpeta raíz se debe ejecutar en el CLI el comando:
```
npm install
```

### Pasos para correr las pruebas:

Al ejecutar el siguiente comando se crea una carpeta reports con los 4 reportes generados para su visualización, cada reporte tiene 15 escenarios. El reporte visualiza los steps generados y su estado.

Dede la carpeta raíz se deben ejecutar los test haciendo uso del comando:

```
npx wdio run ./wdio.conf.js
```