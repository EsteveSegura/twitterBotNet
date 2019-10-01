const puppeteer = require('puppeteer');


module.exports = class TwitterBot{
    constructor(user,password,proxy){
        this.user = user;
        this.password = password;
        this.proxy = proxy;
    }
    
    //login by .env File
    async login(){
        //Opening Twitter
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://twitter.com/login', {waitUntil: 'networkidle2'});

        //Find the inputs for password and user_email
        await page.evaluate( (user,password) => {
            document.getElementsByClassName("email-input")[1].value = user
            document.getElementsByClassName("js-password-field")[0].value =password
        },this.user, this.password)

        //Click in login Button
        await page.click("button.submit")

        return {
            browser : browser,
            page : page,
        }
    }

    async awenserTweetById(actualSession,tweetUrl,text){
        //Go to tweet and wait
        await actualSession.page.goto(tweetUrl, {waitUntil: 'networkidle2'})
        await actualSession.page.waitFor(8000)
        
        //Click in button to send reply
        await actualSession.page.click(`article [role="group"] [role="button"]`)
        await actualSession.page.waitFor(8000)
        await actualSession.page.type(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr", text, { delay: 20 });
        //Click on send button... This can be done with shorcut Ctrl+Enter
        await actualSession.page.click(`[role="button"][tabindex="0"] > div > span > span`);
    }

    async close(actualSession){
        await actualSession.browser.close();
    }
}