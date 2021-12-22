// Lambda expressions
randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
get_element_by_id = (id) => document.getElementById(id);
enable_element = (id) => get_element_by_id(id).disabled = false;
disable_element = (id) => get_element_by_id(id).disabled = true;
query_selector = (argument) => document.querySelector(argument);
sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
hide_element = (element) => element.classList.add("d-none");
show_element = (element) => element.classList.remove("d-none");

// Dark and Light mode switch
const dark = get_element_by_id("dark");
const light = get_element_by_id("light");

function switch_to_dark(){
    hide_element(dark);
    show_element(light);
    document.body.style.backgroundColor = "#212529";
    document.documentElement.style.setProperty("--bar-background-color", "#f5f5f5");
    document.documentElement.style.setProperty("--sort-btn-color", "#f5f5f5");
    document.documentElement.style.setProperty("--shadow-color", "#888888");
    document.documentElement.style.setProperty("--sort-btn-background-color", "#212529");
    document.documentElement.style.setProperty("--source-code-color", "#00ffff");
    document.body.style.color = "#fff";
}
function swith_to_light(){
    hide_element(light);
    show_element(dark);
    document.body.style.backgroundColor = "#f5f5f5";
    document.documentElement.style.setProperty("--bar-background-color", "#212529");
    document.documentElement.style.setProperty("--sort-btn-color", "#212529");
    document.documentElement.style.setProperty("--shadow-color", "#212529");
    document.documentElement.style.setProperty("--sort-btn-background-color", "#f5f5f5");
    document.documentElement.style.setProperty("--source-code-color", "#000000");
    document.body.style.color = "#000";
}

dark.addEventListener("click", switch_to_dark);
light.addEventListener("click", swith_to_light);

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
        arr[sorting_progress % sorting_text.length] = ["/", "-", "\\", "|"][sorting_progress % 4];
        get_element_by_id("SORT").innerHTML = arr.join("");
        sorting_progress++;
        await sleep(500);
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
    else if (algo == "Quick Sort") quick_sort(0, size - 1);
    else if (algo == "Heap Sort") heap_sort();
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
        visual(bars[index], bar_value[index++], sorted_color);
        visual(bars[lsize], bar_value[lsize], sorted_color);
    }
    for (let i = 0; i < size; i++)visual(bars[i],bar_value[i],sorted_color)
}

// Quick sort algorithm
function quick_sort(start, end) {
    if (start > end){
        visual(bars[start], bar_value[start], sorted_color);
        return;
    }
    if (start == end){
        visual(bars[start], bar_value[start], sorted_color);
        return;
    }
    let pivot = bar_value[start];
    let head = start;
    let tail = end + 1;
    while (head < tail){
        do {
            visual(bars[head], bar_value[head], c_1);
            visual(bars[head], bar_value[head], main_color);
            head++;
        } while (bar_value[head] <= pivot);
        do {
            tail--;
            visual(bars[tail], bar_value[tail], c_2);
            visual(bars[tail], bar_value[tail], main_color);
        } while (bar_value[tail] > pivot);
        if (head < tail) [bar_value[head], bar_value[tail]] = [bar_value[tail], bar_value[head]];
    }
    [bar_value[start], bar_value[tail]] = [bar_value[tail], bar_value[start]];
    visual(bars[tail], bar_value[tail], sorted_color);
    quick_sort(start, tail - 1);
    quick_sort(tail + 1, end);
}

// Heap sort algorithm
function heap_sort(){
    for (let i = 0; i < size; i++) heap_up(i);
    for (let i = 0; i < size - 1; i++) {
        let last = size - 1 - i;
        [bar_value[0], bar_value[last]] = [bar_value[last], bar_value[0]];
        visual(bars[0], bar_value[0], sorted_color);
        visual(bars[last], bar_value[last], sorted_color);
        heap_down(last);
    }
}
function heap_up(i){
    let root = Math.floor((i - 1) / 2);
    while (i > 0 && bar_value[root] < bar_value[i]) {
        visual(bars[i], bar_value[i], c_1);
        visual(bars[root], bar_value[root], c_2);
        [bar_value[i], bar_value[root]] = [bar_value[root], bar_value[i]];
        visual(bars[i], bar_value[i], main_color);
        visual(bars[root], bar_value[root], main_color);
        i = root;
        root = Math.floor((i - 1) / 2);
    }
    visual(bars[i], bar_value[i], main_color);
}
function heap_down(size){
    let i = 0;
    while (2 * i + 1 < size) {
        let child = 2 * i + 1;
        if (2 * i + 2 < size && bar_value[2 * i + 2] >= bar_value[child]) child = 2 * i + 2;
        visual(bars[i], bar_value[i], c_1);
        visual(bars[child], bar_value[child], c_2);
        visual(bars[i], bar_value[i], main_color);
        visual(bars[child], bar_value[child], main_color);
        if (bar_value[i] >= bar_value[child]) return;
        [bar_value[i], bar_value[child]] = [bar_value[child], bar_value[i]];
        i = child;
    }
}

// Generate new unsorted array
randomize_array();