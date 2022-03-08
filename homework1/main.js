// Walking the DOM //

// 1.
console.log(document.body.children[0]);
const div = document.body.firstElementChild;
const ul = div.nextElementSibling;
console.log(ul);
console.log(ul.lastElementChild);

// 2
// 1. Yes.
// 2. No.  Qani vor cildren[0]-n arajin elementn e veradarcnum, bayc hnaravor e elementic araj urish node e exel

// 3
const rows = document.body.children[2].rows;
for (let i = 0; i < rows.length; i++) {
    rows[i].cells[i].style.background = 'red';
}


// ///////////////
// Searching: getElement*, querySelector* //

// let table = document.getElementById('age-table');
// // or
// // table = document.querySelector('#age-table');

// let labels = table.getElementsByTagName('label');
// // or
// // let labels = table.querySelectorAll('label');

// let firstTd = table.querySelector('td');
// let form = document.querySelector('form[name="search"]');
// let inputs = form.querySelectorAll('input');
// let firstInput = inputs[0];
// let lastInput = inputs[inputs.length - 1];

// ///////////////
// Node properties: type, tag and contents //

// 1
// let ul = document.querySelector('table').nextElementSibling;

// function uls(ul) {
//     for (let li of ul.children) {
//         let name = li.firstChild.data.trim();
//         let len = li.querySelectorAll('li').length;
//         let res = name + ': ' + len;
//         alert(res);
//         if (li.children.length > 0) {
//             let ul = li.children[0];
//             uls(ul);
//         }
//     }
// }

// uls(ul);

// 2
// 1, vorovhetev lastChild-@ script-i katarman pahin <script>-n e - element node 

// 3
// BODY

// 4
// HTMLDocument
// HTMLDocument, Document, Node, EventTarget

// /////////////////
// Attributes and properties //

// 1
// let elem = document.querySelector('[data-widget-name]');
// console.log(elem.dataset.widgetName);
// // or
// console.log(elem.getAttribute('data-widget-name'));

// 2
// let a = document.querySelector('a[name=list]');
// let ul = a.nextElementSibling;
// let as = ul.querySelectorAll('a');

// for (let a of as) {
//     let href = a.getAttribute('href');
//     if (href.includes('://') && !href.startsWith('http://internal.com')) {
//         a.style.color = 'orange';
//     }
// }