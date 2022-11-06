
import * as Algorithms from 'Algorithms'


const { random , floor } = Math;


const randomInt = ( minimum , maximum ) =>
    floor(random() * ( maximum - minimum + 1) + minimum);
    
const elementById = ( id ) =>
    document.getElementById(id);
    
    
const query = ( selector ) =>
    document.querySelector(selector);
    
const sleep = ( millis ) =>
    new Promise((resolve) => setTimeout(resolve,millis));


const enableElement = ( id ) =>
    elementById(id).disabled = false;
    
const disableElement = ( id ) =>
    elementById(id).disabled = true;
    
const hideElement = ( element ) =>
    element.classList.add('d-none');
    
const showElement = ( element ) =>
    element.classList.remove('d-none');
    
const swapContent = ( elementA , elementB ) =>
    [ elementA.innerText , elementB.innerText ] =
        [ elementB.innerText , elementA.innerText ];


// Dark and Light mode switch

const 
    light = elementById('light') ,
    dark = elementById('dark') ;


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

const algorithmSelection = document
    .getElementsByClassName('dropdown-item');
    
const activeSelection = elementById('nav-menu');


let algorithm = 'Bubble Sort';

for ( const choice of algorithmSelection )
    choice.addEventListener('click',selectAlgorithm);
    
function selectAlgorithm ( event ){
    
    const { target } = event;
    
    swapContent(target,activeSelection);
    
    algorithm = activeSelection.innerText;
}


// Sorting bars

let
    sorting_progress = 0 ,
    sorting_text = 'Sorting' ,
    bar_value = [] ,
    width = 2 ,
    BARS = query('.BARS') ,
    bars = [] ,
    size = 35 ,
    time = 0 ;

let delay = 10000 / (floor(size / 10) * 500);


elementById('size')
    .addEventListener('input',onSizeChange);

elementById('speed')
    .addEventListener('input',onSpeedChange);
    

function onSizeChange ( event ){
    
    const { value } = event.target;
    
    width = 60 / value;

    randomizeValues();
}

function onSpeedChange ( event ){
    
    const { value } = event.target;
    
    delay = 10000 / (floor(size / 10) * value);    
}
    

// Progress of the sorting

const AnimationSteps = [ '/' , '-' , '\\' , '|' ];

async function sorting_bar (){
    while (sorting_progress){
        
        const chars = [ ... sorting_text ];
        
        chars[sorting_progress % sorting_text.length] = AnimationSteps[sorting_progress % 4];
        
        elementById('SORT').innerText = chars.join('');
        
        sorting_progress++;
        
        await sleep(500);
    }
}


// Generate random array

function randomizeValues (){
    
    clearTimeout();
    
    enableElement('nav-menu');
    enableElement('SORT');
    enableElement('size');
    
    sorting_progress = 0;
    time = 0;
    
    elementById('SORT').innerText = 'Sort';
    BARS.innerHTML = '';
    
    for ( let i = 0 ; i < size ; i++ ){
        
        const 
            value = randomInt(50,500) ,
            bar = document.createElement('div') ;

        bar.classList.add('bar');
        
        BARS.appendChild(bar);
        
        bar.style.height = `${ value }px`;
        bar.style.width = `${ width }%`;
        
        [ bar_value[i] , bars[i] ] = [ value , bar ];
    }
    
    const stable = document.createElement('div');
    stable.classList.add('stable');
    
    BARS.appendChild(stable);
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


query('.random-array')
    .addEventListener('click',randomizeValues);


const SORT = elementById('SORT');

SORT.addEventListener('click',async () => {
    
    sorting_progress = 1;
    
    sorting_bar();
    
    disableElement('nav-menu');
    disableElement('SORT');
    disableElement('size');
    
    const process = Algorithms[algorithm](size,bar_value,0,size - 1);
    
    for ( const [ color , index ] of process )
        await visualize(index,color);
    
    enableElement('nav-menu');
    enableElement('SORT');
    enableElement('size');
    
    elementById('SORT').innerText = 'Sort';

    sorting_progress = 0;
    time = 0;
})


// Generate new unsorted array

randomizeValues();
