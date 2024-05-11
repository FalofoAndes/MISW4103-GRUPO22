# Pruebas de regresión visual

Esta carpeta contiene un proyecto de regresión visual que permite comparar las interfaces gráficas (estados) entre dos versiones de la aplicación cms Ghost en cumplimiento de sus funcionalidades. Para las pruebas automatizadas E2E de la aplicación se usará playwrigth y para realizar el análisis de imágenes con el fin de una regresión visual se usará ResembleJS. Las versiones de los componentes usados son las siguientes:

- npm:10.5.1
- NodeJS:18.20
- Playwright: 1.44.0,
- Resemblejs: 5.0.0

Se ejecutaron las pruebas en las plataformas de Windows 11 y Windows 10.

### Pasos para instalar las dependencias:

Desde la carpeta raíz se debe ejecutar en el CLI el comando:
```
npm install
```
Se recomienda en caso de no tener instalada la dependencia de playwright de manera global instalarla usando el comando:

```
npm install playwright
```
### Pasos para correr las pruebas:

Dede la carpeta raíz se deben ejecutar los test haciendo uso del comando:

```
npx playwright test tests/test.spec.js
```

Al terminar los test se tendran las imagenes tomadas para los diferentes escenarios en las dos versiones de ghost en la carpeta '/screenshots'.

Posterior a esto se debe ejecutar el siguiente comando desde el CLI en la carpeta raíz, con el fin de realizar los informes de similitud entre los estados de la aplicación desde inicio a fin en cumplimiento de una funcionalidad en las dos diferentes versiones de Ghost.

```
node index.js
```
Estos informes HTML se encontrarán en la carpeta '/results' junto con las imagenes sobrepuestas que nos entrega resembleJS, estás ultimas dentro de las carpetas 'compare'. Cada reporte contiene un analísis visual entre los diferentes estados entre la versión antigua y la versión más reciente de Ghiost, así como el MisMatch Percentage que indicá el parecido desde un punto de vista númerico de las imagenes. 
