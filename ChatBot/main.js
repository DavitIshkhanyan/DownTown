let messageForm = document.forms.messageForm;
let userCheckbox = document.forms.userCheckbox;
let container = document.getElementById('container');
let messages = getMessages();

function getMessages() {
    return JSON.parse(localStorage.getItem('messages')) || [];
}
function setMessages(messages = []) {
    localStorage.setItem('messages', JSON.stringify(messages));
}
function getUser() {
    return +localStorage.getItem('user') || 1;
}
function setUser(user = 1) {
    localStorage.setItem('user', user);
}

function renderCheckbox() {
    let user = getUser();
    if (user === 2) {
        userCheckbox[1].checked = true;
    }
}

function renderMessage({id, text, user}, sameUser) {
    let message = document.createElement('p');
    message.className = 'message';
    switch (sameUser + '|' + user) {
        case ('sameUserMiddle|'+ 1):
            message.classList.add('sameUser1Message2');
            break;
        case ('sameUserStart|' + 1):
            message.classList.add('sameUser1Message1');
            break;
        case ('sameUserEnd|' + 1):
            message.classList.add('sameUser1Message3');
            break;
        case ('sameUserMiddle|' + 2):
            message.classList.add('sameUser2Message2');
            break;
        case ('sameUserStart|' + 2):
            message.classList.add('sameUser2Message1');
            break;
        case ('sameUserEnd|' + 2):
            message.classList.add('sameUser2Message3');
            break;
    }
    if (user === 2) {
        message.classList.add('user2');
    }
    message.textContent = text;
    container.append(message);
}

function renderMessages(messages = []) {
    let visibleMessages = Array.from(container.children);
    visibleMessages.forEach(element => element.remove());
    messages.forEach((item,index) => {
        let sameUser = false;
        if (index > 0 && messages[index - 1].user === item.user) {
            sameUser = 'sameUserEnd';
            if (index < messages.length - 1 && messages[index + 1].user === item.user) {
                sameUser = 'sameUserMiddle';
            }
        } else if (index < messages.length - 1 && messages[index + 1].user === item.user) {
            sameUser = 'sameUserStart';
        }
        renderMessage(item, sameUser);
    });
    container.scrollTo(0, container.scrollHeight);
}

messageForm.addEventListener('submit', function sendMessage() {
    let messages = getMessages();
    let user = getUser();
    let messageText = this.message.value;
    if (!messageText) return;
    this.message.value = '';
    // let messageUser = user;
    // console.log(user);
    let message = {id: Date.now(), text: messageText, user: user};
    // console.log(message);
    messages.push(message);
    setMessages(messages);
    renderMessages(messages);
});

userCheckbox.addEventListener('change', function checkUser(event) {
    if (event.target.type === 'radio') {
        let user = +event.target.value;
        setUser(user);
    }
});

renderMessages(messages);
renderCheckbox();
