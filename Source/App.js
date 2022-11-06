
import { queryAll , query , create , byId } from 'Document'
import progressAnimation from 'Progress'
import * as Algorithms from 'Algorithms'


const { random , floor } = Math;


const randomInt = ( minimum , maximum ) =>
    floor(random() * ( maximum - minimum + 1) + minimum);
    
const sleep = ( millis ) =>
    new Promise((resolve) => setTimeout(resolve,millis));


let
    sorting_progress = 0 ,
    sortingProcess ,
    algorithm = 'Bubble Sort' ,
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


const algorithmSelection = 
    queryAll('.dropdown-menu > li');
    
const activeSelection =
    byId('nav-menu');

const elements_bars = 
    query('.BARS');

const button_sort = 
    byId('SORT');


    
function onAlgorithmSelect ( event ){
    
    const { target } = event;
    
    target.swapTextWith(activeSelection);
    
    algorithm = activeSelection.innerText;
}


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
    
    disableNavigation(false);
    
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

async function visualize ( index , color ){
        
    const [ value , bar ] = [ bar_value[index] , bars[index] ];
    
    if(bar){
        
        await sleep(delay);
        
        const { style } = bar;
                
        style.backgroundColor = color;
        style.height = `${ value }px`;
    }
}


function disableNavigation ( state ){
    byId('nav-menu').disabled = state;
    byId('SORT').disabled = state;
    byId('size').disabled = state;
}


function onStartSorting (){
    sortingProcess = sort();
}

async function sort (){
        
    sorting_progress = 1;
    cancel = false;
    
    disableNavigation(true);
    animateSorting();
    
    const parameters = [ size , bar_value , 0 , size - 1 ]
    
    const process = Algorithms[algorithm]( ... parameters );
    
    for ( const [ color , index ] of process ){
        
        await visualize(index,color);
        
        if(cancel)
            break;
    }
    
    disableNavigation(false);
    
    clearInterval(animation);
    
    button_sort.innerText = 'Sort';

    sorting_progress = 0;
    time = 0;
}



for ( const choice of algorithmSelection )
    choice.addEventListener('click',onAlgorithmSelect);

query('.random-array')
    .addEventListener('click',randomizeValues);

byId('speed')
    .addEventListener('input',onSpeedChange);

byId('size')
    .addEventListener('input',onSizeChange);

button_sort
    .addEventListener('click',onStartSorting);


randomizeValues();
