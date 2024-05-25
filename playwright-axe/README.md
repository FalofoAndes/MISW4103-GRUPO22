# Pruebas de accesibilidad con Playwright

Esta carpeta contiene un proyecto de Playwright para la ejecución de pruebas automatizadas de accesibilidad de la aplicación Ghost desplegada en [este enlace](https://ghost-ur1e.onrender.com). Las versiones de los componentes usados son las siguientes:

- NodeJS 20.12.1
- NPM 10.5.2
- Playwright 1.44.0
- axe-core 4.9.1

Se ejcutaron las pruebas en las plataformas de Windows 11 y Ubuntu 22.04.

## Ejecución del proyecto

Para ejecutar las pruebas, se debe abrir una terminal de línea de comandos para instalar las dependencias de NodeJS:

```
npm install
```

Luego de esto, se puede ejecutar las pruebas usando el comando:

```
npx playwright test
```

Cuando se finaliza la ejecución de las pruebas en la carpeta [screenshots](screenshots) quedan las carpetas de las pantallas donde se realizaron las pruebas y en cada una se tienen los diferentes screenshots tomados para identificar la ubicación del error con su descripción.

Las pruebas son ejecutadas por defecto en el navegador de Chrome en modo headless. Sin embargo, si se desea ejecutar las pruebas en otro navegador, se puede descomentar la sección del navegador deseado en el archivo `playwright.config.ts`

```
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }
```
