let game = document.getElementById('game');
let blocks = game.children;
let refresh = document.getElementById('refresh');
let gameOver = false;
// let clickEvent = new Event('click');

// appending blocks to game
for (let i = 0; i < 9; i++) {
    let div = document.createElement('div');
    div.className = 'block';
    div.dataset.key = i + 1;
    game.append(div);
}

let statuses = ['x','o'];

function getStorage() {
    return JSON.parse(localStorage.getItem('game')) || [];
}
function setStorage(storage = []) {
    localStorage.setItem('game', JSON.stringify(storage));
}

let storage = getStorage();
renderGame(storage);

function changeStatus() {
    if(status === 1) {
        status = 2;
    } else {
        status = 1;
    }
}

function renderItem({ id, text}) {
    blocks[id - 1].append(text);
}

function renderGame(storage) {
    const assigned = Array.from(document.getElementsByClassName('block'));
    assigned.forEach((element) => {element.innerHTML = ''});
    storage.forEach((item) => {
        renderItem(item);
    });
}

function checkWinner() {
    for (let i = 0; i < 9; i+=3) {
        if (blocks[i].innerHTML === blocks[i + 1].innerHTML && blocks[i + 1].innerHTML === blocks[i + 2].innerHTML && blocks[i].innerHTML !== '') {
            alert('Game Over.\nWinner is ' + blocks[i].innerHTML);
            // refresh.dispatchEvent(clickEvent);
            refresh.click();
            gameOver = true;
            break;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (blocks[i].innerHTML === blocks[i + 3].innerHTML && blocks[i + 3].innerHTML === blocks[i + 6].innerHTML && blocks[i].innerHTML !== '') {
            alert('Game Over.\nWinner is ' + blocks[i].innerHTML);
            // refresh.dispatchEvent(clickEvent);
            refresh.click();
            gameOver = true;
            break;
        }
    }
    if (blocks[0].innerHTML === blocks[4].innerHTML && blocks[4].innerHTML === blocks[8].innerHTML && blocks[0].innerHTML !== '') {
        alert('Game Over.\nWinner is ' + blocks[0].innerHTML);
        // refresh.dispatchEvent(clickEvent);
        refresh.click();
        gameOver = true;
    }
    if (blocks[2].innerHTML === blocks[4].innerHTML && blocks[4].innerHTML === blocks[6].innerHTML && blocks[2].innerHTML !== '') {
        alert('Game Over.\nWinner is ' + blocks[2].innerHTML);
        // refresh.dispatchEvent(clickEvent);
        refresh.click();
        gameOver = true;
    }
}

// nichya-i depqum 
function draw() {
    alert('Game Over.\nThere is no winner.');
    // refresh.dispatchEvent(clickEvent);
    refresh.click();
}

function player2() {
    let notAssigned = [1,2,3,4,5,6,7,8,9];
    for (let i of storage) {
        for (let j = 1; j < 10; j++) {
            if (i.id === j) { 
                var myIndex = notAssigned.indexOf(j);  
                notAssigned.splice(myIndex, 1);
            }
        }
    }
    if(notAssigned.length === 0) {
        draw();
        return;
    }
    var rand = Math.floor(Math.random() * notAssigned.length);
    let id = notAssigned[rand];
    const obj = {id: id, text: statuses[1]};
    storage.push(obj);
    setStorage(storage);
    renderGame(storage);
    checkWinner();
}

game.addEventListener('click', function handleClick(event) {
    let alreadyAssigned = false;
    storage.forEach((element) => {
        if (element.id === +event.target.dataset.key) {
            alreadyAssigned = true;
            return;
        };
    });
    if (alreadyAssigned) return;
    const obj = {id: +event.target.dataset.key, text: statuses[0]};
    storage.push(obj);
    setStorage(storage);
    renderGame(storage);
    checkWinner();
    if (gameOver) {
        gameOver = false;
        return;
    } 
    player2();
});

refresh.onclick = function handleRefresh() {
    setStorage();
    storage = getStorage();
    renderGame(storage);
}

