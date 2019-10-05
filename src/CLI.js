const fs = require('fs');
const inquirer = require('inquirer');
const clear = require('clear');
const utils = require('./utils');
const twitterBot = require('./twitter.js');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../database/db.json');
const db = low(adapter)
const dataBase = db.get('users').value()


let filesRead = []
const dataFolder = "../data/"

async function menu(){
    return new Promise((resolve,reject)=>{
        inquirer.prompt([{
            type: 'list',
            name: 'actionToDo',
            message: 'you want to do?',
                choices: [
                    {
                        key: '0',
                        value: 'Launch Attack',
                    },
                    {
                        key: '1',
                        value: 'Add new bots',
                    },
                    {
                        key: '2',
                        value: 'Add new proxies',
                    },
                    {
                        key: '3',
                        value: 'Add new user Agents',
                    },
                    {
                        key: '4',
                        value: 'Flush data'
                    },
                    {
                        key: '5',
                        value: 'Exit',
                    },
                ],
            },
        ]).then(async (answers) => {
            let filesFolder = await utils.getFilesInsideFolder(dataFolder)
            filesFolder = filesFolder.map((file,index) => {
                return {
                    key: index,
                    value:file
                }
            })
            switch (answers.actionToDo){
                case 'Launch Attack':
                    for(let i = 0; i < dataBase.length ; i++){
                        console.log(dataBase[i])
                        await main(dataBase[i].userTwitter,dataBase[i].passwordTwitter,"proxy",dataBase[i].userAgent );
                    }
                    clear()
                break;

                //ADD NEW BOTS
                case 'Add new bots':
                    const createBot = require('./createBot.js');
                    inquirer.prompt([{
                        type: 'list',
                        name: 'fileBots',
                        message: 'Choose .txt file',
                            choices: filesFolder,
                        },
                    ]).then(async (answers) => {
                        if(!utils.checkIfIsInArray(filesRead,answers.fileBots)){
                            let botsReadLineByLine = await utils.readFileLineByLine(`${dataFolder}${answers.fileBots}`)
                            botsReadLineByLine.forEach((bot) => {
                                filesRead.push(answers.fileBots)
                                bot = bot.split(":")
                                let createNewBot =new createBot(bot[0],bot[1],bot[2],bot[3])
                                createNewBot.registerNewBot()
                                console.log(`BOT: ${bot[0]} Added!`)
                                resolve("OK")
                            });
                        }else{
                            resolve("File Repeated")
                        }
                        clear()
                    });
                break;

                case 'Add new proxies':
                    const createProxy = require('./createProxy.js');
                    inquirer.prompt([{
                        type: 'list',
                        name: 'fileProxies',
                        message: 'Choose .txt file',
                            choices: filesFolder,
                        },
                    ]).then(async (answers) => {
                        if(!utils.checkIfIsInArray(filesRead,answers.fileProxies)){
                            let botsReadLineByLine = await utils.readFileLineByLine(`${dataFolder}${answers.fileProxies}`)
                            botsReadLineByLine.forEach((proxy) => {
                                filesRead.push(answers.fileProxies)
                                proxy = proxy.split(":")
                                let createNewProxy = new createProxy(proxy[0],proxy[1],proxy[2],proxy[3])
                                createNewProxy.registerNewProxy()
                                console.log(`PROXY: ${proxy[0]} Added!`)
                                resolve("OK")
                            });
                        }else{
                            resolve("File Repeated")
                        }
                        clear()
                    });
                break;

                case 'Add new user Agents':
                    const createUserAgent = require('./createUserAgent.js');
                    inquirer.prompt([{
                        type: 'list',
                        name: 'fileUserAgent',
                        message: 'Choose .txt file',
                            choices: filesFolder,
                        },
                    ]).then(async (answers) => {
                        if(!utils.checkIfIsInArray(filesRead,answers.fileUserAgent)){
                            let botsReadLineByLine = await utils.readFileLineByLine(`${dataFolder}${answers.fileUserAgent}`)
                            botsReadLineByLine.forEach((userAgent) => {
                                filesRead.push(answers.fileUserAgent)
                                let createNewUserAgent = new createUserAgent(userAgent)
                                createNewUserAgent.registerNewUserAgent()
                                console.log(`PROXY: ${userAgent} Added!`)
                                resolve("OK")
                            });
                        }else{
                            resolve("File Repeated")
                        }
                        clear()
                    });
                break;

                case 'Flush data':
                    try {
                        fs.unlinkSync('../database/db.json');
                        resolve("OK")
                    } catch (error) {
                        resolve("File Not Found")        
                    }
                    clear()
                break;

                case 'Exit':
                    clear()
                break;
            }
        });
    });
}

(async()=>{
    while(true){
        await menu()
    }
})();



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
    await bot.close(actualSession);
}