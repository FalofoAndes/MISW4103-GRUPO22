# Pruebas con Playwright

Esta carpeta contiene un proyecto de Playwright para la ejecución de pruebas automatizadas E2E de la aplicación Ghost desplegada en [este enlace](https://ghost-ur1e.onrender.com). Las versiones de los componentes usados son las siguientes:

- NodeJS 20.12.1
- NPM 10.5.2
- Playwright 1.43.1
- Faker 5.5.3

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

Cuando se finaliza la ejecución de las pruebas se despliega un servidor web local donde se muestra el resultado de estas. Allí también se pueden ver los pasos ejecutados en cada prueba.

Las pruebas son ejecutadas por defecto en el navegador de Firefox y Chrome en modo headless. Sin embargo, si se desea ejecutar las pruebas en otro navegador, se puede descomentar la sección del navegador deseado en el archivo `playwright.config.ts`

```
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }
```
