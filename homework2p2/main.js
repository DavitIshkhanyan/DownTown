// 1 // hanel messages.css-@ comentic
let panes = document.querySelector('#container');

function remove(event) {
    if (event.target.className === 'remove-button') {
        event.target.closest('.pane').remove();
    }
}
panes.addEventListener('click', remove);


// 2
for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
}
tree.addEventListener('click', (event) => {
    if (event.target.tagName != 'SPAN') return;
    if (!event.target.nextElementSibling) return;
    event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
});

// 3
grid.tHead.onclick = function (event) {
    if (event.target.tagName !== 'TH') return;
    let type = event.target.dataset.type;
    let num = event.target.cellIndex;
    my_sort(num, type);
}

function my_sort(num, type) {
    let rows = Array.from(grid.tBodies[0].rows);
    rows.sort((rowA, rowB) => { 
        let a = rowA.cells[num].innerHTML;
        let b = rowB.cells[num].innerHTML;
        if (type === 'number') {
            a = Number(a);
            b = Number(b);
        }
        return a > b ? 1 : -1;
    });
    grid.tBodies[0].append(...rows);
}

// 4
let tooltip;
document.addEventListener('mouseover', function(event) {
    let target = event.target;
    if (target.dataset.tooltip != undefined) {
        tooltip = document.createElement('div');
        tooltip.innerHTML = target.dataset.tooltip;
        tooltip.className = 'tooltip';
        document.body.append(tooltip);
        let cords = target.getBoundingClientRect();
        // console.log(cords);
        // console.log(target.offsetWidth);
        let left = cords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
        if (left < 0) left = 0;
        let top = cords.top - tooltip.offsetHeight - 5;
        if (top < 0) top = cords.top + target.offsetHeight + 5;
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
})
document.addEventListener('mouseout', function() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
})

// 5
// tarberak 1 // popoxvel e HTML-@
function handler() {
    alert( "..." );
    return false;
}

// tarberak 2
function handler1(event) {
    alert( "..." );
    event.preventDefault();
}


// 6
let contents = document.querySelector('#contents');
contents.addEventListener('click', function(event) {
    event.preventDefault();
    let a = event.target.closest('a');
    if (!a) return;
    let leave = confirm('Leave for ' + a.href);
    if (leave) window.location.href = a.href;
});

// 7
thumbs.onclick = function(event) {
    let a = event.target.closest('a');
    if (!a) return;
    largeImg.setAttribute('src', a.getAttribute('href')); 
    return false;
}