const low = require('lowdb');
const utils = require('./utils');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)
const _ = require('lodash');
const createProxy = require('./createProxy');


module.exports = class createBot{
    constructor(userTwitter,passwordTwitter, emailTwitter, passwordEmailTwitter){
        this.userTwitter = userTwitter
        this.passwordTwitter = passwordTwitter
        this.emailTwitter = emailTwitter
        this.passwordEmailTwitter = passwordEmailTwitter
        this.registeredStatus = false
        db.defaults({ users:[], userAgents:[], proxies:[] }).write()
    }
    getUsers(){
        return db.get('users').value()
    }

    getProxies(){
        return db.get('proxies').value()
    }

    /*
    checkIfProxyIsUsed(){
        let users = this.getUsers()
        let proxies = this.getProxies()
        let proxiesUsed  = users.map((user)=>{
            return { "ipProxy" : user.ipProxy}
        })
        let diff = _.pullAllBy(proxies,proxiesUsed, "ipProxy")
        return diff
    }
    */

    checkIfProxyIsUsed(){
        let users = this.getUsers()
        let proxies = this.getProxies()
        let proxiesUsed  = users.map((user)=>{
            return user.ipProxy;
        })
        let proxiesList = proxies.map((proxy)=>{
            return proxy.ipProxy;
        })
        //console.log(proxiesList)
        //console.log(proxiesUsed)
        let allData = [...proxiesList,...proxiesUsed]

        return utils.getNonUnique(allData)
        
    }

    async registerNewBot(){
        //Search if user exist and get the user agent less used
        let userAgents = db.get('userAgents').value()
        let findInDb = db.get('users').find({ "userTwitter" : this.userTwitter }).value()
        let userAgentToUse = userAgents[utils.randomInt(0,userAgents.length-1)].userAgent
        let proxyToUse = this.checkIfProxyIsUsed()

        //if not exists, save to db if exists, return false
        if(typeof findInDb == "undefined"){
            db.get('users').push({ "userTwitter": this.userTwitter ,"passwordTwitter": this.passwordTwitter, "emailTwitter":this.emailTwitter, "passwordEmailTwitter": this.passwordEmailTwitter, "userAgent": userAgentToUse, "ipProxy" : proxyToUse[0] }).write()
            return true
        }else{
            return false
        }
    }
}
