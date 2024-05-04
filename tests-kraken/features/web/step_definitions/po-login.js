async function login(context, email, password){
    let element = await context.driver.$('#ember6');
    await element.setValue(email);
    element = await context.driver.$('#ember8');
    await element.setValue(password);
    element = await context.driver.$('#ember10');
    return await element.click();
}
module.exports = {
    login
};