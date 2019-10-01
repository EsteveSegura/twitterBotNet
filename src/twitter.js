require('dotenv').config()
const puppeteer = require('puppeteer');


class TwitterBot{
    constructor(user,password,proxy){
        this.user = user;
        this.password = password;
        this.proxy = proxy;
    }
    
    

    async login(){
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://twitter.com/login', {waitUntil: 'networkidle2'});

        await page.evaluate( (user,password) => {
            document.getElementsByClassName("email-input")[1].value = user
            document.getElementsByClassName("js-password-field")[0].value =password
        },this.user, this.password)

        await page.click("button.submit")

        return {
            browser : browser,
            page : page,
        }
      
        //await browser.close();      
    }

    async awenserTweetById(actualSession,tweetUrl,text){
        await actualSession.page.goto(tweetUrl)
        await actualSession.page.waitFor(8000)
        
        await actualSession.page.click(`article [role="group"] [role="button"]`)
        await actualSession.page.waitFor(8000)
        await actualSession.page.type(".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr", text, { delay: 20 });
        await actualSession.page.click(`[role="button"][tabindex="0"] > div > span > span`);
    }
}



(async () => {
    console.log(process.env.TWITTER_USER)
    let bot1 = new TwitterBot(process.env.TWITTER_USER,process.env.TWITTER_PASSWORD,"123.33.33.4:5050")
    let actualSession = await bot1.login()
    await bot1.awenserTweetById(actualSession,`https://twitter.com/BluesOfSoul/status/1179047547828080641`,"U cat!")
})();

