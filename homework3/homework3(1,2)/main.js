// 1
let select = document.getElementById('genres');
let selected = select.options[select.selectedIndex];
console.log(selected.value, selected.text);

let option = new Option('Classic', 'classic');
select.append(option);

option.selected = true;

// 2
let view = document.getElementById('view');

view.onclick = function () {
    let textarea = document.createElement('textarea');
    textarea.className = 'edit';
    textarea.value = view.textContent;

    textarea.onkeydown = function(event) {
        if(event.key == 'Enter') {
            this.blur();
        }
    };

    textarea.onblur = function() {
        view.innerText = textarea.value;
        textarea.replaceWith(view);
    };

    view.replaceWith(textarea);
    textarea.focus();
}

