
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
    elementById(id).disable = false;
    
const disableElement = ( id ) =>
    elementById(id).disable = true;
    
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


algorithm = 'Bubble Sort';

for ( const choice of algorithmSelection )
    choice.addEventListener('click',selectAlgorithm);
    
function selectAlgorithm ( event ){
    
    const { target } = event;
    
    swapContent(target,activeSelection);
    
    algorithm = target.innerText;
}


// Sorting bars

let
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
    enableElement('speed');
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
    
    stable = document.createElement('div');
    stable.classList.add('stable');
    
    BARS.appendChild(stable);
}


// Style

sorted_color = '#3CB371';
main_color = '#DC143C';
c_1 = '#FFFF00';
c_2 = '#0096FF';


function visualize ( index , color ){
    
    const [ value , bar ] = [ bar_value[index] , bars[index] ];
    
    const { style } = bar;
    
    setTimeout(() => {
        style.backgroundColor = color;
        style.height = `${ value }px`;
    },time)
    
    time += delay;
}


// Randomize array

query('.random-array')
    .addEventListener('click',randomizeValues);


const Algorithms = {
    'Selection Sort' : selection_sort ,
    'Insertion Sort' : insertion_sort ,
    'Cocktail Sort' : cocktail_sort ,
    'Bubble Sort' : bubble_sort ,
    'Gnome Sort' : gnome_sort ,
    'Quick Sort' : quick_sort ,
    'Heap Sort' : heap_sort
}

SORT = elementById('SORT');

SORT.addEventListener('click',() => {
    
    sorting_progress = 1;
    
    sorting_bar();
    
    disableElement('nav-menu');
    disableElement('speed');
    disableElement('SORT');
    disableElement('size');
    
    Algorithms[algorithm](0,size - 1);
    
    setTimeout(() => {
    
        enableElement('nav-menu');
        enableElement('speed');
        enableElement('SORT');
        enableElement('size');
        
        elementById('SORT').innerText = 'Sort';
    
        sorting_progress = 0;
        time = 0;
    },time);
})


// Bubble sort algorithm

function bubble_sort(){
    
    for( let i = 0 ; i < size - 1 ; i++ ){
        
        for( let j = 0 ; j < size - i - 1 ; j++ ){
            
            visualize(j,c_1);
            visualize(j + 1,c_2);
            
            if(bar_value[j] > bar_value[j + 1]){
                
                [ bar_value[j] , bar_value[j + 1] ] = [ bar_value[j + 1] , bar_value[j] ];
                
                visualize(j,c_2);
                visualize(j + 1,c_1);
            }
            
            visualize(j,main_color);
            visualize(j + 1,main_color);
        }
        
        visualize(size - 1 - i,sorted_color);
    }
    
    visualize(0,sorted_color);
}


// Selection sort algorithm

function selection_sort() {

    for (let i = 0; i < size - 1; i++){
        min = i;
        for (let j = size - 1; j > i; j--){
            visualize(j,c_1);
            if (bar_value[j] < bar_value[min]) min = j;
            visualize(j,main_color);
        }
        [bar_value[i], bar_value[min]] = [bar_value[min], bar_value[i]];
        visualize(i,sorted_color);
        if (min != i) visualize(min,main_color);
    }

    visualize(size - 1,sorted_color);
}

// Insertion sort algorithm
function insertion_sort() {
    for (let i = 0; i < size; i++) {
        temp = bar_value[i];
        visualize(i,c_2);
        let j = i - 1;
        for (j = i - 1; j >= 0 && bar_value[j] > temp; j--) {
            bar_value[j + 1] = bar_value[j];
            visualize(j,c_1);
            visualize(j + 1,c_2);
            visualize(j + 1,sorted_color);
            visualize(j,sorted_color);
        }
        bar_value[j + 1] = temp;
        visualize(i,c_1);
        visualize(i,sorted_color);
        visualize(j + 1,c_2);
        visualize(j + 1,sorted_color);
    }
}

// Gnome sort algorithm
function gnome_sort() {
    let index = 0;
    while (index < size) {
        if (bar_value[index] >= bar_value[index - 1] || index == 0){
            visualize(index,c_1);
            visualize(index,sorted_color);
            index++;
        }
        else {
            [bar_value[index], bar_value[index - 1]] = [bar_value[index - 1], bar_value[index]]
            visualize(index,c_2);
            visualize(index + 1,main_color);
            index--;
        }
    }
    return;
}

// Cocktail sort algorithm
function cocktail_sort(){
    let swapped = true;
    let index = 0;
    let lsize = size;
    while (swapped){
        swapped = false;
        for (let i = index; i < lsize - 1; ++i){
            visualize(i,c_1);
            visualize(i + 1,c_2);
            if (bar_value[i] > bar_value[i + 1]){
                [bar_value[i], bar_value[i + 1]] = [bar_value[i + 1], bar_value[i]];
                visualize(i,c_2);
                visualize(i + 1,c_1);
                swapped = true;
            }
            visualize(i,main_color);
            visualize(i + 1,main_color);
        }
        swapped = false;
        lsize--;
        for (let i = lsize - 1; i >= index; i--) {
            visualize(i,c_1);
            visualize(i + 1,c_2);
            if (bar_value[i] > bar_value[i + 1]) {
                [bar_value[i], bar_value[i + 1]] = [bar_value[i + 1], bar_value[i]];
                visualize(i,c_2);
                visualize(i + 1,c_1);
                swapped = true;
            }
            visualize(i,main_color);
            visualize(i + 1,main_color);
        }
        visualize(index,sorted_color);
        
        index++
        
        visualize(bars[lsize], bar_value[lsize], sorted_color);
    }
    for (let i = 0; i < size; i++)visualize(i,sorted_color)
}

// Quick sort algorithm
function quick_sort(start, end) {
    if (start > end){
        visualize(start,sorted_color);
        return;
    }
    if (start == end){
        visualize(start,sorted_color);
        return;
    }
    let pivot = bar_value[start];
    let head = start;
    let tail = end + 1;
    while (head < tail){
        do {
            visualize(head,c_1);
            visualize(head,main_color);
            head++;
        } while (bar_value[head] <= pivot);
        do {
            tail--;
            visualize(tail,c_2);
            visualize(tail,main_color);
        } while (bar_value[tail] > pivot);
        if (head < tail) [bar_value[head], bar_value[tail]] = [bar_value[tail], bar_value[head]];
    }
    [bar_value[start], bar_value[tail]] = [bar_value[tail], bar_value[start]];
    visualize(tail,sorted_color);
    quick_sort(start, tail - 1);
    quick_sort(tail + 1, end);
}

// Heap sort algorithm
function heap_sort(){
    for (let i = 0; i < size; i++) heap_up(i);
    for (let i = 0; i < size - 1; i++) {
        let last = size - 1 - i;
        [bar_value[0], bar_value[last]] = [bar_value[last], bar_value[0]];
        visualize(0,sorted_color);
        visualize(last,sorted_color);
        heap_down(last);
    }
}
function heap_up(i){
    let root = Math.floor((i - 1) / 2);
    while (i > 0 && bar_value[root] < bar_value[i]) {
        visualize(i,c_1);
        visualize(root,c_2);
        [bar_value[i], bar_value[root]] = [bar_value[root], bar_value[i]];
        visualize(i,main_color);
        visualize(root,main_color);
        i = root;
        root = Math.floor((i - 1) / 2);
    }
    visualize(i,main_color);
}
function heap_down(size){
    let i = 0;
    while (2 * i + 1 < size) {
        let child = 2 * i + 1;
        if (2 * i + 2 < size && bar_value[2 * i + 2] >= bar_value[child]) child = 2 * i + 2;
        visualize(i,c_1);
        visualize(child,c_2);
        visualize(i,main_color);
        visualize(child,main_color);
        if (bar_value[i] >= bar_value[child]) return;
        [bar_value[i], bar_value[child]] = [bar_value[child], bar_value[i]];
        i = child;
    }
}

// Generate new unsorted array
randomizeValues();