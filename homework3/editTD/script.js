let table = document.getElementById('bagua-table');

let editing = false;

table.onclick = function(event) {
    let target = event.target.closest('td');
    if (!target) return;
    if (!table.contains(target)) return;
    
    if (editing) return;
    editing = true;


    target.classList.add('edit-td');

    let textArea = document.createElement('textarea');
    textArea.style.width = target.clientWidth + 'px';
    textArea.style.height = target.clientHeight + 'px';
    textArea.className = 'edit-area';
    let data = target.innerHTML;
    textArea.value = data;
    target.innerHTML = '';
    target.append(textArea);
    textArea.focus();

    

    let ok = document.createElement('button');
    ok.textContent = 'OK';
    ok.onclick = function() {
        target.innerHTML = textArea.value;
        target.classList.remove('edit-td');
        textArea.remove();
        editing = false;
    }
    // Esi petq chi, bayc de tuna tox lini :)
    // textArea.onkeydown = function(event) {
    //     if(event.key == 'Enter') {
    //         ok.click();
    //     }
    // }
    let cancel = document.createElement('button');
    cancel.textContent = 'CANCEL';
    cancel.onclick = function() {
        target.innerHTML = data;
        target.classList.remove('edit-td');
        textArea.remove();
        editing = false;
    }
    let div = document.createElement('div');
    div.className = 'edit-controls';
    div.append(ok);
    div.append(cancel);
    target.append(div);
}