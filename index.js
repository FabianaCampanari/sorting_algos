// Lambda expressions
randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
get_element_by_id = (id) => document.getElementById(id);
enable_element = (id) => get_element_by_id(id).disabled = false;
disable_element = (id) => get_element_by_id(id).disabled = true;
query_selector = (argument) => document.querySelector(argument);
sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
delay = 10000 / (Math.floor(size / 10) * 500);
time = 0;
BARS = query_selector(".BARS");
width = 2;
sorting_text = "Sorting";

size_listener = () => {
    size = get_element_by_id("size").value;
    width = 60 / size;
    randomize_array();
}
speed_listener = () => delay = 10000 / (Math.floor(size / 10) * get_element_by_id("speed").value);
document.getElementById("size").addEventListener("input", size_listener);
document.getElementById("speed").addEventListener("input", speed_listener);

// Progress of the sorting
async function sorting_bar(){
    while (sorting_progress){
        arr = Array.from(sorting_text);
        arr[sorting_progress % sorting_text.length] = ['/', '-', '\\', '|'][sorting_progress % 4];
        get_element_by_id("SORT").innerHTML = arr.join('');
        sorting_progress++;
        await sleep(1000);
    }
};

// Generate random array
const randomize_array = () => {
    clearTimeout();
    enable_element("SORT");
    enable_element("nav-menu");
    enable_element("size");
    enable_element("speed");
    time = 0;
    sorting_progress = 0;
    get_element_by_id("SORT").innerHTML = "Sort";
    BARS.innerHTML = "";
    for (let i = 0; i < size; i++){
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
main_color = "#DC143C";
c_1 = "#FFFF00";
c_2 = "#0096FF";
sorted_color = "#3CB371";

const visual = (bar, height, color) => {
    setTimeout(() => {
        bar.style.height = `${height}px`;
        bar.style.backgroundColor = color;
    }, (time += delay));
};


// Randomize array
query_selector(".random-array").addEventListener("click", randomize_array);


SORT = get_element_by_id("SORT");
SORT.addEventListener("click", () => {
    sorting_progress = 1;
    sorting_bar();
    disable_element("SORT");
    disable_element("nav-menu");
    disable_element("size");
    disable_element("speed");
    for (let i = 0; i < size; i++) bars[i].style.backgroundColor = "#f5f5f5";
    if (algo == "Bubble Sort") bubble_sort();
    else if (algo == "Selection Sort") selection_sort();
    else if (algo == "Insertion Sort") insertion_sort();
    else if (algo == "Gnome Sort") gnome_sort();
    else if (algo == "Cocktail Sort") cocktail_sort();
    setTimeout(function (){
        enable_element("SORT");
        enable_element("nav-menu");
        enable_element("size");
        enable_element("speed");
        get_element_by_id("SORT").innerHTML = "Sort";
        sorting_progress = 0;
        time = 0;
    }, time);
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

// Insertion sort algorithm
function insertion_sort() {
    for (let i = 0; i < size; i++) {
        temp = bar_value[i];
        visual(bars[i], bar_value[i], c_2);
        let j = i - 1;
        for (j = i - 1; j >= 0 && bar_value[j] > temp; j--) {
            bar_value[j + 1] = bar_value[j];
            visual(bars[j], bar_value[j], c_1);
            visual(bars[j + 1], bar_value[j + 1], c_2);
            visual(bars[j + 1], bar_value[j + 1], sorted_color);
            visual(bars[j], bar_value[j], sorted_color);
        }
        bar_value[j + 1] = temp;
        visual(bars[i], bar_value[i], c_1);
        visual(bars[i], bar_value[i], sorted_color);
        visual(bars[j + 1], bar_value[j + 1], c_2);
        visual(bars[j + 1], bar_value[j + 1], sorted_color);
    }
}

// Gnome sort algorithm
function gnome_sort() {
    let index = 0;
    while (index < size) {
        if (bar_value[index] >= bar_value[index - 1] || index == 0){
            visual(bars[index], bar_value[index], c_1);
            visual(bars[index], bar_value[index], sorted_color);
            index++;
        }
        else {
            [bar_value[index], bar_value[index - 1]] = [bar_value[index - 1], bar_value[index]]
            visual(bars[index], bar_value[index], c_2);
            visual(bars[index + 1], bar_value[index + 1], main_color);
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
            visual(bars[i], bar_value[i], c_1);
            visual(bars[i + 1], bar_value[i + 1], c_2);
            if (bar_value[i] > bar_value[i + 1]){
                [bar_value[i], bar_value[i + 1]] = [bar_value[i + 1], bar_value[i]];
                visual(bars[i], bar_value[i], c_2);
                visual(bars[i + 1], bar_value[i + 1], c_1);
                swapped = true;
            }
            visual(bars[i], bar_value[i], main_color);
            visual(bars[i + 1], bar_value[i + 1], main_color);
        }
        swapped = false;
        lsize--;
        for (let i = lsize - 1; i >= index; i--) {
            visual(bars[i], bar_value[i], c_1);
            visual(bars[i + 1], bar_value[i + 1], c_2);
            if (bar_value[i] > bar_value[i + 1]) {
                [bar_value[i], bar_value[i + 1]] = [bar_value[i + 1], bar_value[i]];
                visual(bars[i], bar_value[i], c_2);
                visual(bars[i + 1], bar_value[i + 1], c_1);
                swapped = true;
            }
            visual(bars[i], bar_value[i], main_color);
            visual(bars[i + 1], bar_value[i + 1], main_color);
        }
        visual(bars[lsize], bar_value[lsize], sorted_color);
        index++;
    }
    for (let i = 0; i < size; i++)visual(bars[i],bar_value[i],sorted_color)
}

// Generate new unsorted array
randomize_array();