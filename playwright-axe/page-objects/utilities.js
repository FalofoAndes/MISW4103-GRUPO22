const Jimp = require('jimp');
const path = require('path');

async function saveAccessibilityScreenshot(page, violation, index, folder) {
  const screenshotPath = path.join('./screenshots/'+ folder, `accessibility-issue-${index + 1}.png`);
  const elementsToHighlight = violation.nodes.map(node => node.target).flat();

  await page.addStyleTag({ content: elementsToHighlight.map(selector => `${selector} { outline: 2px solid red; }`).join(' ') });
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot of issue saved at: ${screenshotPath}`);

  // Añadir espacio en blanco debajo de la imagen y texto con información
  const image = await Jimp.read(screenshotPath);

  // Cargar una fuente de 20px
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  // Estimar altura necesaria para el texto
  const text = `ID: ${violation.id}\nMessage: ${violation.description}\nImpact: ${violation.impact}`;
  const lineHeight = 32; // Altura de línea en píxeles (ajustado según la fuente usada)
  const numberOfLines = text.split('\n').length;
  const whiteSpaceHeight = numberOfLines * lineHeight + 20; // Espacio adicional para el margen

  const whiteSpace = new Jimp(image.bitmap.width, whiteSpaceHeight, '#FFFFFF');
  const compositeImage = new Jimp(image.bitmap.width, image.bitmap.height + whiteSpaceHeight);
  compositeImage.composite(image, 0, 0);
  compositeImage.composite(whiteSpace, 0, image.bitmap.height);

  compositeImage.print(font, 10, image.bitmap.height + 10, text, image.bitmap.width - 20);

  await compositeImage.writeAsync(screenshotPath);
}

module.exports = { saveAccessibilityScreenshot };
