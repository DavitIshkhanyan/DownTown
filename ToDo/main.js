function getStatus() {
    return localStorage.getItem('status');
}
function setStatus(status = '') {
    localStorage.setItem('status', status);
}
function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}
function setTodos(todos = []) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

let formContainer = document.getElementsByClassName('formContainer')[0];
let statusForm = document.forms.statusForm;
let arrow = document.getElementsByClassName('arrow')[0];
let clearChecked = document.getElementById('clearChecked');

function itemsLeftCount() {
    let countContainer = document.getElementById('elementsCount');
    let todos = getTodos();
    count = todos.reduce((total, item) => (!item.checked ? total+1 : total), 0);
    countContainer.innerHTML = count + ' items left';
}

function showClearCompleted() {
    let todos = getTodos();
    let someChecked = todos.some(item => item.checked);
    if(someChecked) {
        clearChecked.classList.remove('hide');
    } else {
        clearChecked.classList.add('hide');
    }
}

function renderTodoItem({ id, text, checked }) {
    let formToBeCloned = document.forms.myForm;
    let clone = formToBeCloned.cloneNode(true);

    clone.dataset.key = id;
    clone.classList.remove('hide');
    clone.classList.remove('for-clone');
    clone.textInput.value = text;
    clone.checkbox.checked = checked;
    formContainer.prepend(clone);
}

function renderTodos(todos) {
    let visibleTodos = Array.from(formContainer.children);
    visibleTodos.forEach(element => element.remove());
    todos.forEach(item => {
        renderTodoItem(item);
    });
}

function renderTodosByStatus() {
    let status = getStatus();
    let todos = getTodos();
    switch (status) {
        case 'Active':
            todos = todos.filter(element => !element.checked);
            break;
        case 'Completed':
            todos = todos.filter(element => element.checked);
            break;
    }
    let statusFormArray = Array.from(statusForm.elements);
    statusFormArray.forEach(element => {
        if (element.value === status) {
            element.checked = true;
        }
    });
    renderTodos(todos);
    itemsLeftCount();
}

mainForm.textInput.onkeydown = function handleEnter(event) {
    if (event.keyCode === 13) {
        let text = this.value;
        if (!text) return;
        let todos = getTodos();
        const obj = {id: Date.now(), text: text, checked: false};
        this.value = '';
        todos.push(obj);
        setTodos(todos);
        renderTodosByStatus();
    }
}

statusForm.addEventListener('change', function handleStatus(event) {
    if (event.target.type === 'radio') {
        let status = event.target.value;
        setStatus(status);
        renderTodosByStatus();
    }
});

formContainer.addEventListener('change', function handleCheck(event) {
    if (event.target.type === 'checkbox') {
        let todos = getTodos();
        let id = +event.target.parentElement.dataset.key;
        todos.forEach(item => {
            if (item.id === id) {
                item.checked = !item.checked;
            }
        });
        setTodos(todos);
        renderTodosByStatus();
        showClearCompleted();
    }
});

formContainer.addEventListener('click', function handleDelete(event) {
    if (event.target.type === 'button') {
        let todos = getTodos();
        let id = +event.target.parentElement.dataset.key;
        todos = todos.filter(item => item.id !== id);
        setTodos(todos);
        renderTodosByStatus();
    }
});

arrow.addEventListener('click', function handleArrowClick() {
    let todos = getTodos();
    let allChecked = true; 
    todos.forEach(item => {
        if (!item.checked) {
            allChecked = false;
        }
    });
    todos.forEach(item => {
        if(allChecked) {
            item.checked = false;
        } else {
            item.checked = true;
        }
    });
    setTodos(todos);
    renderTodosByStatus();
    showClearCompleted();
});

clearChecked.addEventListener('click', function handleClearChecked() {
    let todos = getTodos();
    todos = todos.filter(item => !item.checked);
    console.log(todos);
    setTodos(todos);
    renderTodosByStatus();
    showClearCompleted();
});


renderTodosByStatus();
showClearCompleted();
