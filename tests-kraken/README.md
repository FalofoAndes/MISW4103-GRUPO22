# Pasos para instalar Kraken

Para instalar la herramienta, abra una terminal e ingrese el siguiente comando:

npm install kraken-node -g

Una vez que haya terminado la instalación, ya podrá usar las herramientas de Kraken. Lo primero que debe hacer para comenzar a utilizarlas es crear un proyecto base. Para ello, desde la misma terminal, cree el directorio que dedicará para correr estas prueba, si no lo ha hecho, y ubíquese en él. Desde allí, ejecute el siguiente comando:

kraken-node gen

en el directorio que se generó con el comando kraken-node gen, usted instale de forma local la herramienta kraken-node. Es decir, en esta misma terminal, ejecute el siguiente comando:

npm install kraken-node

En algunos casos se debe instalar y configurar el Android Debug Bridge (adb) en su equipo.
Se recomienda seguir el paso a paso de este link [https://developer.android.com/tools/adb?hl=es-419](https://developer.android.com/tools/releases/platform-tools?hl=es-419)

Otro posible error es que el comando appium no se reconozca a nivel del sistema operativo y, por ende, Kraken no lo pueda utilizar. Si esto le sucede, ejecute el siguiente comando para instalarlo:

npm install -g appium

# Para ejecutar las pruebas siga los siguientes pasos:

Parece en la carpeta all-features e ingrese al archivo .feature de la funcionalidad que desea probar.

Copie el escenario que desea ejecutar en el archivo test.feature que se encuentra en la raíz del proyecto. 

Un ejemplo de como el archivo test.feature debe quedar:
> Feature: Create Page in Ghost
  As an user I want to create page to share my content 
  @user1 @web
  Scenario Outline: Create Page in Ghost with bad date
    Given I navigate to page "<URL>"
    And I login "<USERNAME1>" "<PASSWORD1>"
    When I navigate to page "<URL_PAGES>"
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

 node_modules/.bin/kraken-node run 
 

