let game = document.getElementById('game');
let blocks = game.children;
let refresh = document.getElementById('refresh');
let gameOver = false;

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
function getStatus() {
    return +localStorage.getItem('status') || 1;
}
function setStatus(status = 1) {
    localStorage.setItem("status", status);
}

let storage = getStorage();
let status = getStatus();
renderGame(storage);

function changeStatus() {
    if(status === 1) {
        status = 2;
        setStatus(status);
    } else {
        status = 1;
        setStatus(status);
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
            refresh.click();
            gameOver = true;
            break;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (blocks[i].innerHTML === blocks[i + 3].innerHTML && blocks[i + 3].innerHTML === blocks[i + 6].innerHTML && blocks[i].innerHTML !== '') {
            alert('Game Over.\nWinner is ' + blocks[i].innerHTML);
            refresh.click();
            gameOver = true;
            break;
        }
    }
    if (blocks[0].innerHTML === blocks[4].innerHTML && blocks[4].innerHTML === blocks[8].innerHTML && blocks[0].innerHTML !== '') {
        alert('Game Over.\nWinner is ' + blocks[0].innerHTML);
        refresh.click();
        gameOver = true;
    }
    if (blocks[2].innerHTML === blocks[4].innerHTML && blocks[4].innerHTML === blocks[6].innerHTML && blocks[2].innerHTML !== '') {
        alert('Game Over.\nWinner is ' + blocks[2].innerHTML);
        refresh.click();
        gameOver = true;
    }
}

// nichya-i depqum 
function draw() {
    alert('Game Over.\nThere is no winner.');
    refresh.click();
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
    status = getStatus();
    let text = statuses[status - 1];
    changeStatus();
    const obj = {id: +event.target.dataset.key, text: text};
    storage.push(obj);
    setStorage(storage);
    renderGame(storage);
    checkWinner();
    if (storage.length === 9) {
        draw();
    }
    if (gameOver) {
        gameOver = false;
        return;
    }
});

refresh.onclick = function handleRefresh() {
    setStorage();
    setStatus();
    storage = getStorage();
    renderGame(storage);
}

