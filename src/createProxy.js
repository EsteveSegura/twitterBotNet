const low = require('lowdb');
const _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)


module.exports = class createProxy{
    constructor(ip,port,user,password){
        this.ip = ip;
        this.port = port;
        this.user = user;
        this.password = password;
        let registered = this.registerNewProxy();
        if(registered){
            this.registeredStatus = true;
        }
    }
    
    registerNewProxy(){
        //Search if user exist and get the user agent less used
        let findInDb = db.get('proxies').find({ "ip" : this.ip }).value()

        //if not exists, save to db if exists, return false
        if(typeof findInDb == "undefined"){
            db.get('proxies').push({ "ip": this.ip, "port" : this.port, "user" : this.user, "password" : this.password }).write()
            return true
        }else{
            return false
        }
    }
}

//let p = new createProxy("a3","a","a","a")