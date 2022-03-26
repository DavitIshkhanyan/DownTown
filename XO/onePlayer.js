let game = document.getElementById('game');
let blocks = game.children;
let refresh = document.getElementById('refresh');
let gameOver = false;
let nulls = new Array(9).fill(null);

// let clickEvent = new Event('click');

// appending blocks to game
for (let i = 0; i < 9; i++) {
    let div = document.createElement('div');
    div.className = 'block';
    div.dataset.key = i;
    game.append(div);
}

let statuses = ['x','o'];

function getStorage() {
    return JSON.parse(localStorage.getItem('game')) || nulls;
}
function setStorage(storage = nulls) {
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

function renderItem(text, index) {
    let id = index;
    if (text !== null) {
        blocks[id].append(text);
    }
}

function renderGame(storage) {
    const assigned = Array.from(document.getElementsByClassName('block'));
    assigned.forEach((element) => {element.innerHTML = ''});
    storage.forEach((item,index) => {
        renderItem(item,index);
    });
}

function checkWinner() {
    for (let i = 0; i < 9; i+=3) {
        if (storage[i] === storage[i + 1] && storage[i + 1] === storage[i + 2] && storage[i] !== null) {
            alert('Game Over.\nWinner is ' + storage[i]);
            // refresh.dispatchEvent(clickEvent);
            refresh.click();
            gameOver = true;
            break;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (storage[i] === storage[i + 3] && storage[i + 3] === storage[i + 6] && storage[i] !== null) {
            alert('Game Over.\nWinner is ' + storage[i]);
            // refresh.dispatchEvent(clickEvent);
            refresh.click();
            gameOver = true;
            break;
        }
    }
    if (storage[0] === storage[4] && storage[4] === storage[8] && storage[0] !== null) {
        alert('Game Over.\nWinner is ' + storage[0]);
        // refresh.dispatchEvent(clickEvent);
        refresh.click();
        gameOver = true;
    }
    if (storage[2] === storage[4] && storage[4] === storage[6] && storage[2] !== null) {
        alert('Game Over.\nWinner is ' + storage[2]);
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
    let notAssigned = [0,1,2,3,4,5,6,7,8];
    for (let i = 0; i < 9; i++) {
        if (storage[i] !== null) {
            for (let j = 0; j < 9; j++) {
                if (i === j) { 
                    var myIndex = notAssigned.indexOf(j);  
                    notAssigned.splice(myIndex, 1);
                }
            }
        }
    }
    if(notAssigned.length === 0) {
        renderGame(storage);
        setTimeout(draw);
        return;
    }
    var rand = Math.floor(Math.random() * notAssigned.length);

    let id = notAssigned[rand];
    storage[id] = statuses[1];
    setStorage(storage);
    renderGame(storage);
    setTimeout(() => {
        checkWinner();
        if (gameOver) {
            gameOver = false;
            return;
        } 
    });
    // checkWinner();
}

game.addEventListener('click', function handleClick(event) {
    let alreadyAssigned = false;
    let id = +event.target.dataset.key;
    if (storage[id] !== null) {
        alreadyAssigned = true;
        // return;
    }
    if (alreadyAssigned) return;
    storage[id] = statuses[0];

    setStorage(storage);
    renderGame(storage);

    // checkWinner();
    setTimeout(checkWinner);
    setTimeout(() => {
        if (gameOver) {
            gameOver = false;
            return;
        }   

        player2();
    },100);
});

refresh.onclick = function handleRefresh() {
    setStorage();
    storage = getStorage();
    renderGame(storage);
    gameOver = false;
}

