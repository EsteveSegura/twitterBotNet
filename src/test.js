const twitterBot = require('./twitter.js');
const bot = new twitterBot(process.env.TWITTER_USER,process.env.TWITTER_USER,"123.33.33.4:5050");
require('dotenv').config();

//Example bot 
async function main(){
    //Perform login
    console.log(`Login with: ${process.env.TWITTER_USER}`);
    let actualSession = await bot.login();
    
    //Answering a tweet
    /*let tweetToAnswering = "https://twitter.com/Wauxx00_/status/1179094549882384384"
    console.log(`Answering to: ${tweetToAnswering} `)
    await bot.awenserTweetById(actualSession,tweetToAnswering,"U cat!")*/

    await bot.postTweet(actualSession,".");

    console.log(`Close`);
    await bot.close(actualSession);
}

//main()
