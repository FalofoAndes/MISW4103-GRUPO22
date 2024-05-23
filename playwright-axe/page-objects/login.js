exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.identification = page.locator('input[name="identification"]');
        this.passwordField = page.locator('input[name="password"]');
        this.signInButton = page.locator('button', { hasText: 'Sign in →' });
       }

       async submitLoginForm(user, password) {
        await this.identification.fill(user);
        await this.passwordField.fill(password);
        await this.signInButton.click();
      }


       async login() {
        const username = 'pruebauniandes@uniandes.edu.co';
        const userPassword = 'Uniandes123456';
        await this.page.goto('https://ghost-ur1e.onrender.com/ghost/#/signin');
        await this.submitLoginForm(username, userPassword);
        
      }
}

