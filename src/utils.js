const fs = require('fs');
const readline = require('readline');

function randomInt(min,max){
    return Math.round(Math.random() * (max-min)+ min)
}

function readFileLineByLine(dataPath){
    return new Promise(function(resolve,reject){
        let dataset = []

        let rl = readline.createInterface({
            input: fs.createReadStream(dataPath)
        });
        
        rl.on('line', function(line) {
            dataset.push(line)
        });
        
        rl.on('close', function(line) {
            resolve(dataset)
        });
    })
}

module.exports = { randomInt, readFileLineByLine }