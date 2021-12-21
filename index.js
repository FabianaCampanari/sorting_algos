// Lambda expressions
randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
get_element_by_id = (id) => document.getElementById(id);
query_selector = (argument) => document.querySelector(argument);

// Navigation bar
A = document.getElementsByClassName("dropdown-item");
algo = "Bubble Sort";
for (let i = 0; i < A.length; i++){
    A[i].addEventListener("click", function(){
        algo = A[i].innerHTML;
        A[i].innerHTML = get_element_by_id("nav-menu").innerHTML;
        get_element_by_id("nav-menu").innerHTML = algo;
    });
}

// Sorting bars
bar_value = [];
bars = [];
size = 35;
BARS = query_selector(".BARS");
width = 2;

// Generate random array
const randomize_array = () => {
    clearTimeout();
    get_element_by_id("SORT").disabled = false;
    get_element_by_id("nav-menu").disabled = false;
    c = 0;
    get_element_by_id("SORT").innerHTML = "Sort";
    BARS.innerHTML = "";
    for (i = 0; i < size; i++){
        bar_value[i] = randint(50, 500);
        bars[i] = document.createElement("div");
        bars[i].classList.add("bar");
        BARS.appendChild(bars[i]);
        bars[i].style.height = `${bar_value[i]}px`;
        bars[i].style.width = `${width}%`;
    }
    stable = document.createElement("div");
    stable.classList.add("stable");
    BARS.appendChild(stable);
};


// Style                                             
speed = 500;                                         
delay = 10000 / (Math.floor(size / 10) * speed);
c = 0;

main_color = "#DC143C";
c_1 = "#FFFF00";
c_2 = "#0096FF";
sorted_color = "#3CB371";

const visual = (bar, height, color) => {
    setTimeout(() => {
        bar.style.height = `${height}px`;
        bar.style.backgroundColor = color;
    }, (c += delay));
};


// Randomize array
query_selector(".random-array").addEventListener("click", randomize_array);


SORT = get_element_by_id("SORT");
SORT.addEventListener("click", () => {
    get_element_by_id("SORT").disabled = true;
    get_element_by_id("nav-menu").disabled = true;
    for (let i = 0; i < size; i++) bars[i].style.backgroundColor = "#f5f5f5";
    if (algo == "Bubble Sort") bubble_sort();
    else if (algo == "Selection Sort") selection_sort();
    setTimeout(function () {
        get_element_by_id("SORT").disabled = false;
        get_element_by_id("nav-menu").disabled = false;
        get_element_by_id("SORT").innerHTML = "Sort";
        c = 0;
    }, c);
});

// Bubble sort algorithm
function bubble_sort() {
    for (let i = 0; i < size - 1; i++){
        for (let j = 0; j < size - i - 1; j++){
            visual(bars[j], bar_value[j], c_1);
            visual(bars[j + 1], bar_value[j + 1], c_2);
            if (bar_value[j] > bar_value[j + 1]){
                [bar_value[j], bar_value[j + 1]] = [bar_value[j + 1], bar_value[j]];
                visual(bars[j], bar_value[j], c_2);
                visual(bars[j + 1], bar_value[j + 1], c_1);
            }
            visual(bars[j], bar_value[j], main_color);
            visual(bars[j + 1], bar_value[j + 1], main_color);
        }
        visual(bars[size - 1 - i], bar_value[size - 1 - i], sorted_color);
    }
    visual(bars[0], bar_value[0], sorted_color);
}

// Selection sort algorithm
function selection_sort() {
    for (let i = 0; i < size - 1; i++){
        min = i;
        for (let j = size - 1; j > i; j--){
            visual(bars[j], bar_value[j], c_1);
            if (bar_value[j] < bar_value[min]) min = j;
            visual(bars[j], bar_value[j], main_color);
        }
        [bar_value[i], bar_value[min]] = [bar_value[min], bar_value[i]];
        visual(bars[i], bar_value[i], sorted_color);
        if (min != i) visual(bars[min], bar_value[min], main_color);
    }
    visual(bars[size - 1], bar_value[size - 1], sorted_color);
}

// Generate new unsorted array
randomize_array();