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

const correctPosition = document.createElement('correctPos');
const correctColor = document.createElement('correctCol');
const notCorrect = document.createElement('notCorrect');
correctColor.innerHTML = indicator;
correctPosition.innerHTML = indicator;
notCorrect.innerHTML = emptyIndicator;

const header = document.getElementsByTagName('th');
let currentTurn;

generateCode();
NextRow();

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

checkBtn.addEventListener('click', checkCurrentRow);

function checkCurrentRow(){
    values = [];
    let scoreField = currentTurn.lastElementChild;

    for(let i = 1;i<5;i++){
        if(currentTurn.children.item(i).children.length === 0){
            console.log('empty cell detected, skipping check')
            return
        }
        const cellVal = colors.indexOf(currentTurn.children.item(i).childNodes[0].classList[0]);
        values.push(checkValue(i-1,cellVal));
    }
    let correct = values.filter(item => item==='correct').length;
    let incorrect = values.filter(item => item==='incorrect').length;
    
    for (let index = 0; index < correct; index++) {
        scoreField.appendChild(correctPosition.cloneNode(true));
    }

    for (let index = 0; index < incorrect; index++) {
        scoreField.appendChild(correctColor.cloneNode(true));
    }

    let leftover = 4 - (correct+incorrect);
    for (let index = 0; index < leftover; index++) {
        scoreField.appendChild(notCorrect.cloneNode(true));
    }

    if(correct<4){
        NextRow();
    }else{
        document.getElementById('won').classList.remove('hidden');
        checkBtn.disabled = true;
        for(let i = 1; i<=code.length;i++){
            header.item(i).innerHTML = codePin;
            header.item(i).classList.add(colors[code[i-1]])
        }
    }
}

function checkValue(index, input){
    if(code[index] === input) return 'correct';
    if(!code.includes(input)) return 'wrong';
    return 'incorrect';
}

function NextRow(){
    if(turn>1){
        for(let i = 1; i<5;i++){
            const cell = currentTurn.children.item(i);
            cell.removeEventListener('dragenter', setDropTarget);
            cell.removeEventListener('dragover', setDropTarget);
            cell.removeEventListener('dragleave', resetDropTarget);
            cell.removeEventListener('drop', DropTarget);
        }
    }

    currentTurn = document.getElementById(`turn${turn++}`);

    for(let i = 1; i<5;i++){
        const cell = currentTurn.children.item(i);
        cell.addEventListener('dragenter', setDropTarget);
        cell.addEventListener('dragover', setDropTarget);
        cell.addEventListener('dragleave', resetDropTarget);
        cell.addEventListener('drop', DropTarget);
    }
}

//Event Handlers

function handleDragStartPin(event){
    event.target.style.opacity = '0.4';
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.setData('text/plain', event.target.classList[0])
}

function handleDragEndPin(event){
    event.target.style.opacity = '';
}

function handleDropPin(event){
    event.preventDefault();
}

function setDropTarget(event){
    event.preventDefault();
    if(event.currentTarget.style.border == ""){
        event.currentTarget.style.border = "2px dotted black";
    }
}

function resetDropTarget(event){
    event.preventDefault();

    event.currentTarget.style.border = "";
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