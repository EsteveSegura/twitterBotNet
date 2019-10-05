const fs = require('fs');
const readline = require('readline');

function getFilesInsideFolder(dataFolder){
    return new Promise((resolve,reject) => {
        fs.readdir(dataFolder, (err,files) =>{
            if(err){
                reject(err)
            }
            resolve(files)
        })
    })
}

function getNonUnique(arr){
    return  arr.filter(function(e, i){
        return arr.indexOf(e) == arr.lastIndexOf(e);
    });
}

function checkIfIsInArray(arr,key){
    let returnedValue = false;
    arr.forEach(element => {
        if(element == key){
            returnedValue = true
        }
    });
    return returnedValue
}

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

module.exports = { getNonUnique, randomInt, readFileLineByLine, getFilesInsideFolder, checkIfIsInArray }