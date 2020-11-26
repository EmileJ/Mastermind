//const code = {}
const colors = ['red','green','blue','yellow']
var turn = 1;
var code = [];

const codePin = '&#9864;';
const indicator = '&#x128205;';

var cell = document.createElement('TD')
var row = document.createElement('TR')
const table = document.getElementById('playField')

var test = 0;

for (let i = 0; i < 5; i++) {
    if(i===0){
        row.append(cell.cloneNode())
    }else{
        let newCell = cell.cloneNode()
        newCell.addEventListener('drop',droppin_handler)
        row.append(newCell)
    }
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
}

function droppin_handler(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text/plain')
    event.target.appendChild(document.getElementById(data))
}

function dragstart_handler(event){
    event.currentTarget.style.border = '1px dashed black'
    event.dataTransfer.setData('text/plain', event.target)
    event.dataTransfer.dropEffect = 'all';
}

window.addEventListener('DOMContentLoaded', ()=>{
    const pins = document.getElementsByTagName('pin')
    for(let pin of pins){
        pin.addEventListener('dragstart', dragstart_handler)
    }
})

window.addEventListener('dragenter', (event)=>{
    console.log("valig droppable")
})

generateCode()
const header = document.getElementsByTagName('th')

for(let i = 0; i<4;i++)
{
    header.item(i+1).innerHTML = codePin;
    header.item(i+1).classList.add(colors[code[i]])
}