
import progressAnimation from './ProgressAnimation.js'
import * as Algorithms from 'Algorithms'

const { random , floor } = Math;


const randomInt = ( minimum , maximum ) =>
    floor(random() * ( maximum - minimum + 1) + minimum);
    
const byId = ( id ) =>
    document.getbyId(id);
    
    
const query = ( selector ) =>
    document.querySelector(selector);
    
const queryAll = ( selector ) =>
    document.querySelectorAll(selector);
    
const sleep = ( millis ) =>
    new Promise((resolve) => setTimeout(resolve,millis));

const create = ( type ) =>
    document.createElement(type);

const enableElement = ( id ) =>
    byId(id).disabled = false;
    
const disableElement = ( id ) =>
    byId(id).disabled = true;
    
const hideElement = ( element ) =>
    element.classList.add('d-none');
    
const showElement = ( element ) =>
    element.classList.remove('d-none');
    
const swapText = ( elementA , elementB ) =>
    [ elementA.innerText , elementB.innerText ] =
        [ elementB.innerText , elementA.innerText ];




const button_sort = byId('SORT');
const elements_bars = query('.BARS');


// Dark and Light mode switch

const 
    light = byId('light') ,
    dark = byId('dark') ;


function switch_to_dark (){
    
    showElement(light);
    hideElement(dark);
    
    document.body.style.backgroundColor = '#212529';
    document.body.style.color = '#fff';
    
    const { style } = document.documentElement;
    
    style.setProperty('--sort-btn-background-color','#212529');
    style.setProperty('--bar-background-color','#f5f5f5');
    style.setProperty('--source-code-color','#00ffff');
    style.setProperty('--sort-btn-color','#f5f5f5');
    style.setProperty('--shadow-color', "#888888");
}

function swith_to_light (){
    
    hideElement(light);
    showElement(dark);
    
    document.body.style.backgroundColor = '#f5f5f5';
    document.body.style.color = '#000';
    
    const { style } = document.documentElement;
    
    style.setProperty('--sort-btn-background-color','#f5f5f5');
    style.setProperty('--bar-background-color','#212529');
    style.setProperty('--source-code-color','#000000');
    style.setProperty('--sort-btn-color','#212529');
    style.setProperty('--shadow-color','#212529');
}

light.addEventListener('click',swith_to_light);
dark.addEventListener('click',switch_to_dark);


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
    
    enableElement('nav-menu');
    enableElement('SORT');
    enableElement('size');
    
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
    
    disableElement('nav-menu');
    disableElement('SORT');
    disableElement('size');
    
    const process = Algorithms[algorithm](size,bar_value,0,size - 1);
    
    for ( const [ color , index ] of process ){
        
        await visualize(index,color);
        
        if(cancel)
            break;
    }
    
    enableElement('nav-menu');
    enableElement('SORT');
    enableElement('size');
    
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
