const socket = io.connect();

//form messages
const form = document.querySelector('#form');
// form products

//ADD MESSAGE
const addMessage = e => {
    
    e.preventDefault();
    
    const inputMsg = document.querySelector('#message');
    const inputEmail = document.querySelector('#email');
    
    if (inputMsg.value.length > 0 && inputEmail.value.length > 0) {

        return socket.emit('msg', {
            email: inputEmail.value,
            msg: inputMsg.value,
            createdAt : Date.now(),
        });
    }
    form.reset();
}

//Events
form.addEventListener('submit', addMessage);


//RENDER MESSAGES
function renderMsgs(data) {

    const root = document.querySelector('#root');
    const html = `<div class="container">
                        ${data.map( item => `
                        <ul>
                            <li>
                                <div class="author">
                                    <img src="./chat.svg" alt="chat svg"/>
                                    <strong>${item.autor.id}</strong>
                                    <p class="date">${ item.timestamps}</p>
                                </div>
                                <em>${item.text}</em>
                            </li>`).join('\n')}
                        </ul>
                    </div>`;

    data.length > 0 ? root.innerHTML = html :
        root.innerHTML = '<p class="nomsg">No hay mensajes</p>';
}



//RENDER PRODUCTS


function renderProducts(data){
    const root = document.querySelector('#root2')
    const html =` ${data.map(product=>{
                    return  (`  <tr>
                                    <td>${product.name}</td>
                                    <td>${product.price}</td>
                                    <td><img src=${product.thumbnail} class="product-img" alt="thumbnail"/></td>
                                </tr>`
                            )}).join(' ')}`    
    data.length > 0 ? root.innerHTML = html : null
}


socket.on('messages', data => renderMsgs(data));
socket.on('products', data => renderProducts(data));