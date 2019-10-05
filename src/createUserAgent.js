const _ = require('lodash');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)



module.exports = class createUserAgent{
    constructor(userAgent){
        this.userAgent = userAgent;
        db.defaults({ users:[], userAgents:[], proxies:[] }).write()
    }
    
    registerNewUserAgent(){
        //Search if user exist and get the user agent less used
        let findInDb = db.get('userAgents').find({ "userAgent" : this.userAgent }).value()
        //if not exists, save to db if exists, return false
        if(typeof findInDb == "undefined"){
            db.get('userAgents').push({ "userAgent": this.userAgent }).write()
            return true
        }else{
            return false
        }
    }
}
