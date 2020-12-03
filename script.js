//const code = {}
const colors = ['red','green','blue','yellow']
var turn = 1;
var code = [];

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

let dropTarget;

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

function handleDragStartPin(event){
    this.style.opacity = '0.4';
    event.dataTransfer.dropEffect = 'copy';
    console.log('dragStart pin')
    console.log(event)
}

function handleDragEndPin(event){
    this.style.opacity = '1';
    console.log('dragEnd pin')
    console.log(event)
}

function handleDropPin(event){
    console.log('dropped pin');
    console.log(event)
    console.log("check" + table.contains(dropTarget))
}

function testf(event){
    console.log(event)
}

/**
 * drag         - when dragged
 * dragstart    - when dragging starts
 * dragend      - when mouse released or escape
 * dragenter    - when dragged element enters valid drop target
 * dragexit     - when dragged element stops being active draggable
 * dragleave    - when dragged element leaves drop target
 * dragover     - continuously when being dragged (speed depends on element speed)
 * drop         - when draggable is dropped on valid drop target
 */

window.addEventListener('dragenter', (event)=>{
    event.preventDefault();
    dropTarget=event.target;
    // console.log("valid droppable")
    // console.log(event)
})

window.addEventListener('dragover', (event)=>{
    event.preventDefault();
})

window.addEventListener('drop',handleDropPin)

generateCode()
const header = document.getElementsByTagName('th')

for(let i = 1; i<=code.length;i++)
{
    header.item(i).innerHTML = codePin;
    header.item(i).classList.add(colors[code[i-1]])
}

const testelement = document.getElementById(`turn${turn}`);
for(let i = 0;i<4;i++){
    if(i===2) testelement.lastElementChild.innerHTML+='<br />';
    testelement.lastElementChild.appendChild(correctCol.cloneNode(true));
}

checkBtn.addEventListener('click', checkCurrentRow);

function checkCurrentRow(){
    const row = document.getElementById(`turn${turn}`);
    let childs = row.children
    console.log(row)
    console.log(childs)
}