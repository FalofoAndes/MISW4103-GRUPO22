
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs'); // para guardar las capturas de pantalla
const path = require('path'); // para manejar rutas de archivo

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {

    await page.goto('https://ghost-ur1e.onrender.com/ghost/#/signin');
    await page.locator('input[name="identification"]').fill('pruebauniandes@uniandes.edu.co');
    await page.locator('input[name="password"]').fill('Uniandes123456');
    await page.locator('button', { hasText: 'Sign in →' }).click();
  


    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Si hay violaciones, tomamos capturas de pantalla
    if (accessibilityScanResults.violations.length > 0) {
      for (const [index, violation] of accessibilityScanResults.violations.entries()) {
        const screenshotPath = path.join(__dirname, `accessibility-issue-${index + 1}.png`);
        const elementsToHighlight = violation.nodes.map(node => node.target).flat();
        await page.addStyleTag({ content: elementsToHighlight.map(selector => `${selector} { outline: 2px solid red; }`).join(' ') });
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot of issue saved at: ${screenshotPath}`);
      }
    }
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
