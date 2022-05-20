let navigation = document.getElementById('navigation');
let newGame = navigation[0];
let history = navigation[1];
let mainDiv = document.getElementById('main-div');
let gameOver = document.getElementById('game-over');
let content = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
function getContent() {
    return JSON.parse(localStorage.getItem('content')) || [];
}
function setContent(content = []) {
    localStorage.setItem('content', JSON.stringify(content));
}
function getStatus() {
    return JSON.parse(localStorage.getItem('status')) || 0;
}
function setStatus(status = 0) {
    localStorage.setItem('status', status);
}
function getTime() {
    return JSON.parse(localStorage.getItem('time') || 0);
}
function setTime(time) {
    localStorage.setItem('time',  JSON.stringify(time));    
}
function getHistory() {
    return JSON.parse(localStorage.getItem('history')) || [];
}
function setHistory(history) {
    localStorage.setItem('history',  JSON.stringify(history));    
}

function renderGame() {
    setTime(Date.now());
    let storageContent = [];    
    for (let i = 0; i < 16; i++) {
        let div = document.createElement('div');   
        div.className = 'game-rect';
        let rand = Math.floor(Math.random() * content.length);
        div.dataset.key = i;
        div.textContent = content[rand];
        setTimeout(() => div.textContent = '', 3000);
        let obj = {id: i, content: content[rand], visible: false, hidden: false};
        // let obj = {id: 1, content: 1, visible: false, hidden: false};        
        storageContent.push(obj);
        content.splice(rand, 1);
        mainDiv.append(div);        
    }
    setContent(storageContent);    
}
function navigationHide() {
    navigation.style.display = 'none';
}

function renderItem({id, content, visible, hidden}) {
    let div = document.createElement('div');   
    div.className = 'game-rect';    
    div.dataset.key = id;
    if (visible && !hidden) {
        div.textContent = content;
    }
    if (hidden) {
        div.classList.add('hidden');
    }
    mainDiv.append(div);    
}
function refreshGame() {
    let storageContent = getContent();
    let visibleRects = Array.from(mainDiv.children);
    visibleRects.forEach(elem => elem.remove());
    storageContent.forEach(item => renderItem(item));
}

function renderHistoryItem({id, time}) {
    let historyTable = document.getElementById('history');    
    let tr = document.createElement('tr');
    let idTd = document.createElement('td');
    idTd.textContent = id;
    let timeTd = document.createElement('td');
    timeTd.textContent = time;
    tr.append(idTd);
    tr.append(timeTd);
    historyTable.append(tr);

}

function addHistory() {
    let history = getHistory();
    let historyTable = document.getElementById('history');
    history.forEach(item => renderHistoryItem(item));
}

navigation.addEventListener('click', function hideNavigation(event) {
    if (event.target.tagName === 'BUTTON') {
        navigationHide();

        if (event.target.id === 'b1') {
            setStatus(1);
            renderGame();
        }
    }
});

function check() {
    let storageContent = getContent();  
    let visibleRects = storageContent.filter(item => item.visible);
    if (visibleRects.length === 2) {
        let visibleRects = storageContent.filter(item => item.visible);
        if (visibleRects[0].content === visibleRects[1].content) {
            storageContent[visibleRects[0].id].hidden = true;
            storageContent[visibleRects[1].id].hidden = true;
            storageContent[visibleRects[0].id].visible = false;
            storageContent[visibleRects[1].id].visible = false; 
        } else {
            storageContent[visibleRects[0].id].visible = false;
            storageContent[visibleRects[1].id].visible = false;    
            console.log(storageContent[visibleRects[0].id]);
            console.log(storageContent[visibleRects[1].id]);                
        }
    }          
    setContent(storageContent);
    refreshGame();
    checkEnd();
}

function checkEnd() {
    let storageContent = getContent();
    let history = getHistory();
    // let minutes = getTime().getMinutes();
    let time = Date.now() - (+getTime());
    let seconds = time / 1000;
    let minutes = time / 60;
    let ms = minutes.toString().slice(0,2) + ':' + seconds.toString().slice(0,2);
    
    let hiddenRects = storageContent.filter(item => !item.hidden);    
    if (hiddenRects.length === 0) {
        mainDiv.style.display = 'none';
        gameOver.hidden = false;   
        setStatus(0);             
    }  
    let id = Date.now().toString();
    let gameId = 1 + id.slice(-4);
    // localStorage.setItem('id', id);
    // let time = 1;
    gameIdP = document.getElementById('game-id');
    timeP = document.getElementById('time');   
    let obj = {id: gameId, time: ms};
    history.push(obj);
    setHistory(history);
    gameIdP.textContent = gameId;
    timeP.textContent = ms;
}

mainDiv.addEventListener('click', function showContent() {
    if (event.target.className === 'game-rect') {
        let storageContent = getContent();
        let rect = event.target;
        storageContent.forEach(item => {
            if (+rect.dataset.key === item.id) {
                item.visible = !item.visible;
            }
        });                 
        setContent(storageContent);
        refreshGame();   

        setTimeout(check, 200);
    }
});

gameOver.onclick = function history() {
    gameOver.hidden = true;
    let historyTable = document.getElementById('history');
    addHistory();        
    historyTable.hidden = false;
}

let status = getStatus();
if (status === 1) {
    navigationHide();
    refreshGame();
}

