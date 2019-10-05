const _ = require('lodash');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)


module.exports = class createProxy{
    constructor(ip,port,user,password){
        this.ip = ip;
        this.port = port;
        this.user = user;
        this.password = password;
        db.defaults({ users:[], userAgents:[], proxies:[] }).write()
    }

    registerNewProxy(){
        let findInDb = db.get('proxies').find({ "ipProxy" : this.ip }).value();
        
        if(typeof findInDb == "undefined"){
            db.get('proxies').push({ "ipProxy": this.ip, "port" : this.port, "user" : this.user, "password" : this.password }).write()
            return true
        }else{
            return false
        }
            
    }
}
