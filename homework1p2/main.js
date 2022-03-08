// Modifying the document //

// 1 
// 1 ev 3-@, qani vor nranq avelacnum en vorpes text, isk 2-@ avelacnum e vorpes html

// 2
function clear(elem) { 
    elem.innerHTML = '';
}
    
let elem = document.querySelector('#elem');
clear(elem); // очищает список

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