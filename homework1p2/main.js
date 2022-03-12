// Modifying the document //

// 1 
// 1 ev 3-@, qani vor nranq avelacnum en vorpes text, isk 2-@ avelacnum e vorpes html

// 2
function clear(elem) { 
    elem.innerHTML = '';
}
    
let elem = document.querySelector('#elem');
clear(elem); 

// 3
// vorovhetev aaa-n irakanum table-ic durs e 

// 4
// let ul = document.createElement('ul');
// document.body.append(ul);

// while (true) {
//     let content = prompt('Enter the content: ');
//     if (!content) {
//         break;
//     }
//     let li = document.createElement('li');
//     li.textContent = content;
//     ul.append(li);
// }

// 5
res = '';
function createTree (container, data) {
    for (let i in data) {
        res += `<ul><li>${i}`;
        if (data[i]) {
            createTree(container, data[i]);
        }
        res += `</li></ul>`;
    }
    return res;
}


let data = {
    "Fish": {
      "trout": {},
      "salmon": {}
    },
  
    "Tree": {
      "Huge": {
        "sequoia": {},
        "oak": {}
      },
      "Flowering": {
        "apple tree": {},
        "magnolia": {}
      }
    }
  };

let container = document.getElementById('container');
container.innerHTML += createTree(container, data);


// 6
for (let li of document.querySelectorAll('li')) {
    let count = li.getElementsByTagName('li').length;
    if (count) {
        li.firstChild.data += ' [' + count + ']';
    }
}

// 7
function createCalendar(elem, year, month) {
    let table = document.createElement('table');
    elem.append(table);
    let th = '<tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr>';
    let d = new Date(year, month - 1);
    let tr = '<tr>';
    for (let i = 0; i < d.getDay() - 1; i++) {
        tr += '<td></td>';
    }
    // console.log(d.getMonth());
    while(d.getMonth() + 1 === month) {
        if (d.getDay() === 1) {
            tr += '<tr>';
        }

        tr += '<td>' + d.getDate() + '</td>';
        // console.log(d.getDay());

        if (d.getDay() === 0) {
            tr += '</tr>';
        }
        d.setDate(d.getDate()+1)
    }

    if (d.getDay() !== 1) {
        for (let i = d.getDay() - 1; i < 7; i++) {
            tr += '<td></td>';
          }
    }
    table.innerHTML += th + tr;
    // console.log(d);
    // console.log(table.innerHTML);
}

createCalendar(calendar, 2012, 9);

// 8
let div = document.createElement('div');

let hh = document.createElement('span');
hh.style = 'color: red';
hh.textContent = 'hh';
let mm = document.createElement('span');
mm.style = 'color: green';
mm.textContent = 'mm';
let ss = document.createElement('span');
ss.style = 'color: blue';
ss.textContent = 'ss';
let text = ':';

div.append(hh, text, mm, text, ss);
document.querySelectorAll('hr')[1].after(div);

let myInterval;
function update() {
    const d = new Date();
    hh.textContent = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours(0);
    mm.textContent = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes(0);
    ss.textContent = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds(0);
}
function clockStart() {
    if (!myInterval) {
        myInterval = setInterval(update, 1000);
    }
    update();
}

function clockStop() {
    clearInterval(myInterval);
    myInterval = 0;
}

// 9
let lis = '<li>2</li><li>3</li>';
one.insertAdjacentHTML('afterend',lis);

// 10
let body = table.getElementsByTagName('tbody')[0];
let arr = Array.from(body.children);
arr.sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);
console.log(body);
body.append(...arr);