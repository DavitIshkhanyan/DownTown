// 1
let hider = document.getElementById('hider');
hider.onclick = () => text.hidden = true;

// 2
hider1.onclick = function () {
    this.hidden = true;
}

// 3
// 1, 2; remove-@ chi ashxati, qani vor remove anelu hamar petq e nuyn function-@ tal(aysinqn nuyn reference-@) 

// 5
let slide_menu = document.getElementById('slide-menu');
let flag = 'collapse';
slide_menu.onclick = function opCol() {
    if (flag === 'collapse') {
        slide_menu.firstElementChild.textContent = '▼ ';
        slide_menu.nextElementSibling.hidden = false;
        flag = 'open';
    } else {
        slide_menu.firstElementChild.textContent = '▶ ';
        slide_menu.nextElementSibling.hidden = true;
        flag = 'collapse';
    }
}

// 6
let panes = document.querySelector('.pane').parentElement;
let button = document.querySelector('.remove-button');

for (let i of panes.children) {
    let but = button.cloneNode(true);
    but.onclick = function closing() {
        this.parentElement.style.display = 'none';
    }
    i.firstElementChild.after(but);
}

// 7
let gallery = document.querySelector('.gallery');

let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let ul = gallery.querySelector('ul');
let lis = ul.querySelectorAll('li');
console.log(lis.length);
let position = 0;
let transition;
next.onclick = function next() {
    position++;
    if ((Math.abs(transition) + 390) > 910) {
        transition = -910;
        position = Math.floor(lis.length / 3);
    } else {
        transition = position * (-390);   // 390-@ (130 * 3)-n e, isk 130-@ mek nkari erkarutyunn e
    }
    ul.style.transform = "translateX("+ transition + "px)";
}

prev.onclick = function prev() {
    position--;
    if (transition >= 0) {
        transition = 0;
        position = 0;
    } else {
        transition = position * (-390);
    }
    ul.style.transform = "translateX("+ transition + "px)";
}

