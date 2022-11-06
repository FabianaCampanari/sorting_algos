
import progressAnimation from './ProgressAnimation.js'
import * as Algorithms from 'Algorithms'

import { queryAll , query , create , byId } from './Document.js'

const { random , floor } = Math;


const randomInt = ( minimum , maximum ) =>
    floor(random() * ( maximum - minimum + 1) + minimum);
    
const sleep = ( millis ) =>
    new Promise((resolve) => setTimeout(resolve,millis));

const swapText = ( elementA , elementB ) =>
    [ elementA.innerText , elementB.innerText ] =
        [ elementB.innerText , elementA.innerText ];




const button_sort = byId('SORT');
const elements_bars = query('.BARS');





// Navigation bar

const algorithmSelection = queryAll('.dropdown-menu > li');
    
const activeSelection = byId('nav-menu');


let algorithm = 'Bubble Sort';


    
function selectAlgorithm ( event ){
    
    const { target } = event;
    
    swapText(target,activeSelection);
    
    algorithm = activeSelection.innerText;
}


// Sorting bars

let
    sorting_progress = 0 ,
    sortingProcess ,
    bar_value = [] ,
    cancel = false ,
    animation ,
    width = 2 ,
    bars = [] ,
    size = 35 ,
    time = 0 ;



const delayFrom = ( factor ) =>
    10000 / (floor(size / 10) * factor);
    

let delay = delayFrom(500);



    

function onSizeChange ( event ){
    
    const { value } = event.target;
    
    width = 60 / value;

    randomizeValues();
}

function onSpeedChange ( event ){
    
    const { value } = event.target;
    
    delay = delayFrom(value);
}
    


function animateSorting (){
    
    const steps = progressAnimation();
    
    const animate = () =>
        button_sort.innerText = steps.next().value;

    animation = setInterval(animate,500);
}


async function randomizeValues (){
    
    cancel = true;
    
    await sortingProcess;
    
    clearInterval(animation);
    
    byId('nav-menu').enable();
    byId('SORT').enable();
    byId('size').enable();
    
    sorting_progress = 0;
    time = 0;
    
    elements_bars.innerHTML = '';
    button_sort.innerText = 'Sort';
    
    bars = [];
    bar_value = [];
    
    prepareBars();
}


function prepareBars (){
    
    for ( let i = 0 ; i < size ; i++ )
        generateBar();
    
    const stable = create('div');
    stable.classList.add('stable');
    elements_bars.appendChild(stable);
}


function generateBar (){
    
    const 
        value = randomInt(50,500) ,
        bar = create('div') ;
    
    const { style } = bar;
    
    style.height = `${ value }px`;
    style.width = `${ width }%`;
    
    elements_bars.appendChild(bar);
    bar_value.push(value);
    bars.push(bar);
}

function visualize ( index , color ){
    return new Promise((resolve) => {
        
        const [ value , bar ] = [ bar_value[index] , bars[index] ];
        
        if(bar){
            
            const { style } = bar;
            
            setTimeout(() => {
                style.backgroundColor = color;
                style.height = `${ value }px`;
                resolve();
            },delay)
            
        } else {
            resolve();
        }
    })
}


function prepareSorting (){
    sortingProcess = sortValues();
}

async function sortValues (){
        
    sorting_progress = 1;
    cancel = false;
    
    animateSorting();
    
    byId('nav-menu').disable();
    byId('SORT').disable();
    byId('size').disable();
    
    const process = Algorithms[algorithm](size,bar_value,0,size - 1);
    
    for ( const [ color , index ] of process ){
        
        await visualize(index,color);
        
        if(cancel)
            break;
    }
    
    byId('nav-menu').enable();
    byId('SORT').enable();
    byId('size').enable();
    
    clearInterval(animation);
    
    button_sort.innerText = 'Sort';

    sorting_progress = 0;
    time = 0;
}



for ( const choice of algorithmSelection )
    choice.addEventListener('click',selectAlgorithm);

query('.random-array')
    .addEventListener('click',randomizeValues);

byId('size')
    .addEventListener('input',onSizeChange);

byId('speed')
    .addEventListener('input',onSpeedChange);

button_sort.addEventListener('click',prepareSorting);

randomizeValues();
