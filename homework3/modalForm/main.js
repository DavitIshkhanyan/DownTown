function showCover() {
    let cover = document.createElement('div');
    cover.id = 'cover-div';

    document.body.style.overflowY = 'hidden';

    document.body.append(cover);
}

function hideCover() {
    document.getElementById('cover-div').remove();
    document.body.style.overflowY = '';
}

function showPrompt(text, callback) {
    showCover();
    let form = document.getElementById('prompt-form');
    let container = document.getElementById('prompt-form-container');
    document.getElementById('prompt-message').innerHTML = text;
    form.text.value = '';

    function complete(value) {
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
        callback(value);
    }

    form.onsubmit = function() {
        let value = form.text.value;
        if (!value) return false;
        complete(value);
        return false;
    }

    form.cancel.onclick = function() {
        let value = null;
        complete(value);
        return false;
    }

    document.onkeydown = function(event) {
        if (event.keyCode === 27) {
            form.cancel.click();
        }
    }

    form.cancel.onkeydown = function(event) {
        if (event.keyCode === 9 && !event.shiftKey) {
            form.text.focus();
            return false;
        }
    };

    form.text.onkeydown = function(event) {
        if (event.keyCode === 9 && event.shiftKey) {
            form.cancel.focus();
            return false;
        }
    }

    container.style.display = 'block';
    form.elements.text.focus();
}

document.getElementById('show-button').onclick = function() {
    showPrompt("Enter something<br>...smart :)", function(value) {
        alert("You Entered: " + value);
    })
};
