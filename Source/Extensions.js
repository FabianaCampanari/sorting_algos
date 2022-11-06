

const Element = HTMLElement.prototype;

Element.show = function (){
    this.classList.remove('d-none');
}

Element.hide = function (){
    this.classList.add('d-none');
}

Element.enable = function (){
    this.disabled = false;
}

Element.disable = function (){
    this.disabled = true;
}
