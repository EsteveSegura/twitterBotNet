const twitterBot = require('./twitter.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)
require('dotenv').config();
const dataBase = db.get('users').value()



//Example bot 
async function main(user,password,proxy,userAgent){
    const bot = new twitterBot(user,password,proxy,userAgent);
    //Perform login
    console.log(`Login with: ${user}`);
    let actualSession = await bot.login();
    
    //Answering a tweet
    /*let tweetToAnswering = "https://twitter.com/Wauxx00_/status/1179094549882384384"
    console.log(`Answering to: ${tweetToAnswering} `)
    await bot.awenserTweetById(actualSession,tweetToAnswering,"U cat!")*/

    //await bot.postTweet(actualSession,".");

    await bot.checkUserAgent(actualSession)
    console.log(`Close`);
    //await bot.close(actualSession);
}

(async ()=>{
    console.log("s")
    for(let i = 0; i < dataBase.length ; i++){
        console.log(dataBase[i])
        await main(dataBase[i].userTwitter,dataBase[i].passwordTwitter,"proxy",dataBase[i].userAgent );
    }
})()
