const fs = require('fs')
const inquirer = require('inquirer');
const createBot = require('./createBot.js');
const createProxy = require('./createProxy.js');
const utils = require('./utils');

const dataFolder = "../data/"

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
                value: 'Add new proxy',
            },
            {
                key: '3',
                value: 'Add new user Agent',
            },
        ],
    },
]).then(async (answers) => {
    let filesFolder = await getFilesInsideFolder()
    filesFolder = filesFolder.map((file,index) => {
        return {
            key: index,
            value:file
        }
    })
    switch (answers.actionToDo){
        //ADD NEW BOTS
        case 'Add new bots':
            inquirer.prompt([{
                type: 'list',
                name: 'fileBots',
                message: 'Choose .txt file',
                    choices: filesFolder,
                },
            ]).then(async (answers) => {
                let botsReadLineByLine = await utils.readFileLineByLine(`${dataFolder}${answers.fileBots}`)
                botsReadLineByLine.forEach((bot) => {
                    bot = bot.split(":")
                    new createBot(bot[0],bot[1],bot[2],bot[3])
                    console.log(`BOT: ${bot[0]} Added!`)
                });
            });
            break;

        case 'Add new proxy':
            inquirer.prompt([{
                type: 'list',
                name: 'fileProxies',
                message: 'Choose .txt file',
                    choices: filesFolder,
                },
            ]).then(async (answers) => {
                let botsReadLineByLine = await utils.readFileLineByLine(`${dataFolder}${answers.fileProxies}`)
                botsReadLineByLine.forEach((bot) => {
                    bot = bot.split(":")
                    new createProxy(bot[0],bot[1],bot[2],bot[3])
                    console.log(`PROXY: ${bot[0]} Added!`)
                });
            });
            break;
    }
});


function getFilesInsideFolder(){
    return new Promise((resolve,reject) => {
        fs.readdir(dataFolder, (err,files) =>{
            if(err){
                reject(err)
            }
            resolve(files)
        })
    })
}





/*

            let botsReadLineByLine = await utils.readFileLineByLine(`../data/${answers.addBot}`)
            botsReadLineByLine.forEach((bot) => {
                bot = bot.split(":")
                new createBot(bot[0],bot[1],bot[2],bot[3])
                console.log(`BOT: ${bot[0]} Added!`)
            });
            */