require('dotenv').config()
let twitterBot = require('./twitter.js');


//Example bot 1
(async () => {

    console.log(`Login with: ${process.env.TWITTER_USER}`)
    let bot = new twitterBot(process.env.TWITTER_USER,process.env.TWITTER_PASSWORD,"123.33.33.4:5050")
    let actualSession = await bot.login()
    
    let tweetToAnswering = "https://twitter.com/Wauxx00_/status/1179094549882384384"
    console.log(`Answering to: `)
    await bot.awenserTweetById(actualSession,tweetToAnswering,"U cat!")

    console.log(`Close`)
    await bot.close(actualSession)
})();



