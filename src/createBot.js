const low = require('lowdb');
const _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)

module.exports = class createBot{
    constructor(userTwitter,passwordTwitter, emailTwitter, passwordEmailTwitter){
        db.defaults({ users:[], userAgents:[], proxies:[] }).write()
        this.userTwitter = userTwitter
        this.passwordTwitter = passwordTwitter
        this.emailTwitter = emailTwitter
        this.passwordEmailTwitter = passwordEmailTwitter
        this.registeredStatus = false
        let registered = this.registerNewBot();
        if(registered){
            this.registeredStatus = true;
        }
    }

    findHowManyBotsInUserAgent(){
        let dataBase = db.get('users').value()
        let userAgents = db.get('userAgents').value()
        let howManyBotsAreInUserAgent = []


        //Find duplicated and count it
        dataBase = dataBase.sort();
        let currentUserAgent = null;
        let count = 0;
        for(let i = 0 ; i < dataBase.length ; i++){
            if(dataBase[i].userAgent != currentUserAgent){
                if(count > 0){
                    howManyBotsAreInUserAgent.push({
                        userAgent : currentUserAgent,
                        howManyBots : count
                    });
                }
                currentUserAgent = dataBase[i].userAgent;
                count = 1;
            }else{
                count++;
            }
        }
        if(count > 0){
            howManyBotsAreInUserAgent.push({
                userAgent : currentUserAgent,
                howManyBots : count
            });
        }
        
        //Make userAgents ready for compare with loadash
        userAgents = userAgents.map((userAgent)=>{
            return {
                "userAgent": userAgent.userAgent,
                "howManyBots":0
            }
        })

        //Merge unique and sort by less used
        howManyBotsAreInUserAgent = _.unionBy(howManyBotsAreInUserAgent,userAgents,'userAgent')
        howManyBotsAreInUserAgent.sort((a,b) => a.howManyBots - b.howManyBots);
        return howManyBotsAreInUserAgent;
    }

    registerNewBot(){
        //Search if user exist and get the user agent less used
        let findInDb = db.get('users').find({ "userTwitter" : this.userTwitter }).value()
        let userAgentToUse = this.findHowManyBotsInUserAgent()

        //if not exists, save to db if exists, return false
        if(typeof findInDb == "undefined"){
            db.get('users').push({ "userTwitter": this.userTwitter ,"passwordTwitter": this.passwordTwitter, "emailTwitter":this.emailTwitter, "passwordEmailTwitter": this.passwordEmailTwitter, "userAgent": userAgentToUse[0].userAgent }).write()
            return true
        }else{
            return false
        }
    }
}

/*
let bot = new createBot("girlazote","1234","----@gmail.com","---------")
console.log(bot)
*/