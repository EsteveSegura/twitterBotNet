const puppeteer = require('puppeteer');


module.exports = class TwitterBot{
    constructor(user,password,proxy,userAgent){
        this.user = user;
        this.password = password;
        this.proxy = proxy;
        this.userAgent = userAgent;
    }
    
    //login by .env File
    async login(){
        //Opening Twitter
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            `--user-agent="${this.userAgent}"`
        ];

        const options = {
            args,
            headless: false,
            ignoreHTTPSErrors: true,
            //userDataDir: './tmp'
        };

        const browser = await puppeteer.launch(options);
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

    async postTweet(actualSession,text){
        if(text.length < 265){
            await actualSession.page.goto("https://twitter.com/compose/tweet", { waitUntil: "networkidle2" });

            await actualSession.page.type(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr", text, { delay: 20 });
            await actualSession.page.click(`[role="button"][tabindex="0"] > div > span > span`);
        }
    }

    async checkUserAgent(actualSession){
        await actualSession.page.goto("https://www.whatismybrowser.com/detect/what-is-my-user-agent", { waitUntil: "networkidle2" });
    }

    async close(actualSession){
        await actualSession.browser.close();
    }
}