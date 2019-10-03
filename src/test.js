require('dotenv').config()
let twitterBot = require('./twitter.js');
const bot = new twitterBot(process.env.TWITTER_USER,process.env.TWITTER_PASSWORD,"123.33.33.4:5050")


//Example bot 
(async () => {
    //Perform login
    console.log(`Login with: ${process.env.TWITTER_USER}`)
    let actualSession = await bot.login()
    
    //
    let tweetToAnswering = "https://twitter.com/Wauxx00_/status/1179094549882384384"
    console.log(`Answering to: `)
    await bot.awenserTweetById(actualSession,tweetToAnswering,"U cat!")

    console.log(`Close`)
    await bot.close(actualSession)
})();



