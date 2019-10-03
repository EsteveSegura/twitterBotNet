const inquirer = require('inquirer');
const createBot = require('./createBot.js');
const utils = require('./utils');

inquirer
    .prompt([{
        type: 'list',
        name: 'actionToDo',
        message: 'you want to do?',
            choices: [
                {
                    key: 'a',
                    value: 'Launch Attack',
                },
                {
                    key: 'b',
                    value: 'Add new bots',
                },
                {
                    key: 'c',
                    value: 'Add new proxy',
                },
                {
                    key: 'd',
                    value: 'Add new user Agent',
                },
            ],
        },
    ]) //\n
  .then(answers => {
    if(answers.actionToDo == "Add new bots"){
        inquirer.prompt([
            {
                name: 'addBot',
                message: 'Choose path to txt file',
            },
        ]).then(async (answers) => {
            let botsReadLineByLine = await utils.readFileLineByLine(`../data/${answers.addBot}`)
            botsReadLineByLine.forEach((bot) => {
                bot = bot.split(":")
                new createBot(bot[0],bot[1],bot[2],bot[3])
                console.log(`BOT: ${bot[0]} Added!`)
            });
        });
    }
});