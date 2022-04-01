class Message {
    showError(referenceSelector, parentSelector, msg, color, textColor){
        if(document.querySelector('#show-error') === null){
            const parentNode = document.querySelector(parentSelector);
            const referenceNode = document.querySelector(referenceSelector);
            const newNode = document.createElement('div');

            newNode.id = 'show-error';
            newNode.className = `text-${textColor} ${color} p-4 max-w-5xl mx-auto rounded`;
            newNode.textContent = msg;

            parentNode.insertBefore(newNode,referenceNode);

            newNode.style.display = 'none';
        }

        document.querySelector('#show-error').style.display = 'block';
        console.log(color)
        document.querySelector.className = `text-${textColor} ${color} p-4 max-w-5xl mx-auto rounded`;
        document.querySelector('#show-error').textContent = msg;

        setTimeout(() => {
            document.querySelector('#show-error').style.display = 'none';
        }, 5000)
    }

    sendMsg(){
        
    }
}

const message = new Message();
export {message}