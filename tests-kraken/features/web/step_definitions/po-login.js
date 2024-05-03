async function login(context, email, password){
    let element = await context.driver.$('#identification');
    await element.setValue(email);
    element = await context.driver.$('#password');
    await element.setValue(password);
    element = await context.driver.$('#ember5');    
    return await element.click();
}

module.exports = {
    login
};