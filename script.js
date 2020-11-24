//const code = {}
const colors = 4
var turn = 1;
var code = [];

const codePin = '&#9864;';
const indicator = '&#128205;';

var cell = document.createElement('TD')
var row = document.createElement('TR')
const table = document.getElementById('playField')

var test = 0;

for (let i = 0; i < 5; i++) {
    row.append(cell.cloneNode())
}

for (let i = 0; i < 12; i++) {
    //table.innerHTML += `<tr id="turn${i}">` + (("<td></td>")*4) + '</tr>'
    let temp = row
    row.id = `turn${i+1}`
    row.firstChild.innerText = i+1
    table.append(row.cloneNode(true))
}

function generateCode(){
    for(var i = 0; i<4; i++){
        code.push(Math.floor(Math.random()*4))
    }
    console.log(code)
}

generateCode()