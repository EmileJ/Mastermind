const colors = ['red','green','blue','yellow']
let turn = 1;
let code = [];
let newNode;

const codePin = '&#9864;';
const indicator = '&#x1f4cd;';
const emptyIndicator = '&#xffee'

const cell = document.createElement('TD');
const row = document.createElement('TR');
const table = document.getElementById('playField');
const checkBtn = document.getElementById('check');

const correctPos = document.createElement('correctPos');
const correctCol = document.createElement('correctCol');
const notCorrect = document.createElement('notCorrect');
correctCol.innerHTML = indicator;
notCorrect.innerHTML = emptyIndicator;

const header = document.getElementsByTagName('th')
let currentTurn = document.getElementById(`turn${turn}`);

function generateCode(){
    for(var i = 0; i<4; i++){
        code.push(Math.floor(Math.random()*4))
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    const pins = document.getElementsByTagName('pin')
    for(let pin of pins){
        pin.addEventListener('dragstart', handleDragStartPin);
        pin.addEventListener('dragend', handleDragEndPin);
    }
})

generateCode()

for(let i = 1; i<=code.length;i++){
    header.item(i).innerHTML = codePin;
    header.item(i).classList.add(colors[code[i-1]])
}

checkBtn.addEventListener('click', checkCurrentRow);

function checkCurrentRow(){
    const row = document.getElementById(`turn${turn}`);
    const cells = row.children

    for(let i = 1;i<5;i++){
        if(cells.item(i).children.length === 0){
            console.log('empty cell detected, skipping check')
            return
        }
    }

    for(let i = 0;i<4;i++){
        if(i===2) currentTurn.lastElementChild.innerHTML+='<br />';
        currentTurn.lastElementChild.appendChild(correctCol.cloneNode(true));
    }
}

function nextRound(){
    
}

for(let i = 1; i<5;i++){
    const cell = currentTurn.children.item(i);
    cell.addEventListener('dragenter', setDropTarget);
    cell.addEventListener('dragover', event => event.preventDefault());
    cell.addEventListener('dragleave', resetDropTarget);
    cell.addEventListener('drop', DropTarget);
}

//Event Handlers

function handleDragStartPin(event){
    event.target.style.opacity = '0.4';
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.setData('text/plain', event.target.classList)
}

function handleDragEndPin(event){
    event.target.style.opacity = '';
}

function handleDropPin(event){
    event.preventDefault();
}

function setDropTarget(event){
    event.preventDefault();

    newNode = event.target;
    if(event.target.tagName && event.target.tagName.toLowerCase() === 'td'){
        event.target.style.border = "2px dotted black";
    }else{
        const cell = event.target.parentElement.parentElement
        cell.style.border = "2px dotted black";
    }
}

function resetDropTarget(event){
    event.preventDefault();

    if(event.target.contains(newNode)){
        return
    }
    if(event.target.tagName && event.target.tagName.toLowerCase() === 'td'){
        event.target.style.border = "";
    }
    if(!newNode.contains(event.target)){
        event.target.parentElement.parentElement.style.border = "";
    }
}

function DropTarget(event){
    event.preventDefault();
    event.target.style.border = "";
    const data = event.dataTransfer.getData('text/plain')
    if(event.target.tagName.toLowerCase() === "td" && event.target.children.length === 0){
        const element = document.createElement('pin');
        element.innerHTML = codePin;
        element.classList = data;
        event.target.appendChild(element);
    }
    if(event.target.tagName.toLowerCase() === "td" && event.target.children.length > 0){
        event.target.firstChild.classList = data;
    }
    if(event.target.tagName.toLowerCase() === 'pin'){
        event.target.parentNode.style.border = '';
        event.target.classList = data;
    }
}