# Pruebas con Kraken

Esta carpeta contiene un proyecto de kraken para la ejecución de pruebas automatizadas E2E de la aplicación Ghost desplegada en [este enlace](https://ghost-ur1e.onrender.com). Las versiones de los componentes usados son las siguientes:

- NodeJS 20.12.1
- NPM 10.5.2
- Kraken 1.0.24

Se ejecutaron las pruebas en las plataformas de Windows 11 y Windows 10.

### Pasos para instalar Kraken

Para instalar la herramienta, abra una terminal e ingrese el siguiente comando:
```
npm install kraken-node -g
```
Una vez que haya terminado la instalación, ya podrá usar las herramientas de Kraken. Lo primero que debe hacer para comenzar a utilizarlas es crear un proyecto base. Para ello, desde la misma terminal, cree el directorio que dedicará para correr estas prueba, si no lo ha hecho, y ubíquese en él. Desde allí, ejecute el siguiente comando:

```
git clone https://github.com/FalofoAndes/MISW4103-GRUPO22.git
```
en el directorio que se generó con el comando , usted instale de forma local la herramienta kraken-node. Es decir, en esta misma terminal, ejecute el siguiente comando:
```
npm install 
```
En algunos casos se debe instalar y configurar el Android Debug Bridge (adb) en su equipo.
Se recomienda seguir el paso a paso de este link [https://developer.android.com/tools/adb?hl=es-419](https://developer.android.com/tools/releases/platform-tools?hl=es-419)


### Para ejecutar las pruebas siga los siguientes pasos:

Ubiquece en la carpeta all-features e ingrese al archivo .feature de la funcionalidad  y copie el escenario que desea probar.

Pegue el escenario que desea ejecutar en el archivo test.feature que se encuentra en la raíz del proyecto. 

Un ejemplo de como el archivo test.feature debe quedar:

> Feature: Create Page in Ghost
  As an user I want to create page to share my content 
  @user1 @web
  Scenario Outline: Create Page in Ghost with bad date
    Given I navigate to page "< URL >"
    And I login < USERNAME1 > < PASSWORD1 >
    When I navigate to page "< URL_PAGES >"
    And I wait for 1 seconds
    And I click view with selector ".ember-view.gh-btn.gh-btn-primary.view-actions-top-row"
    And I wait for 1 seconds
    And I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
    And I wait for 1 seconds
    And I click view with selector ".gh-date-time-picker-date"
    And I enter text "5"
    And I click view with selector ".gh-date-time-picker-time"
    Then I confirm that the error "Invalid date format" in date picker is shown



Ejecute el siguiente comando para correr las pruebas desde la raíz del proyecto:
```
 node_modules/.bin/kraken-node run 
 ```



