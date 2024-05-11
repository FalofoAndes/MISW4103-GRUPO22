const fs = require('fs');
const path = require('path');
let scenery = '';

class Utilities {
  constructor(page, screenshotCounter, scenery) {
    this.page = page;
    this.screenshotCounter = screenshotCounter;
    this.scenery = scenery;
  }

  async takeScreenshot() {
    // Incrementar el contador y obtener el valor actual
    this.screenshotCounter++;

    
    let screenshot= ''
    /*if(currentCounter<10){
      screenshot = `./screenshots/screenshots1/screenshot_${currentCounter}.png`; // Nombre único para la captura
    }else if(currentCounter<19){
      screenshot = `./screenshots/screenshots2/screenshot_${currentCounter-9}.png`; // Nombre único para la captura
    }else if(currentCounter<30){
      screenshot = `./screenshots/screenshots3/screenshot_${currentCounter-18}.png`; // Nombre único para la captura
    }else if(currentCounter<41){
      screenshot = `./screenshots/screenshots4/screenshot_${currentCounter-29}.png`; // Nombre único para la captura
    }*/
    
    screenshot = `./screenshots/${this.scenery}/screenshot_${this.screenshotCounter}.png`; // Nombre único para la captura


    // Tomar la captura de pantalla y guardarla en la carpeta correspondiente
    await this.page.screenshot({ path: screenshot });
  }
}

module.exports = Utilities;

