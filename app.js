let clientCount = 1;


function addProduct(button) {

    let products = button.previousElementSibling;

    let product = document.createElement("div");

    product.className = "product";

    product.innerHTML = `
    
    <label>Название товара</label>
    <input type="text" placeholder="Название товара">

    <label>Количество</label>
    <input type="text" placeholder="Количество">

    <label>Сумма товара</label>
    <input type="number" placeholder="Сумма">

    <button onclick="removeProduct(this)">
    ❌ Удалить товар
    </button>

    `;

    products.appendChild(product);

}



function removeProduct(button) {

    let product = button.parentElement;

    product.remove();

}



function addClient() {

    clientCount++;


    let clients = document.getElementById("clients");


    let client = document.createElement("div");

    client.className = "client card";


    client.innerHTML = `

    <h2>Клиент №${clientCount}</h2>


    <div class="products">


    <div class="product">


    <label>Название товара</label>
    <input type="text" placeholder="Название товара">


    <label>Количество</label>
    <input type="text" placeholder="Количество">


    <label>Сумма товара</label>
    <input type="number" placeholder="Сумма">


    <button onclick="removeProduct(this)">
    ❌ Удалить товар
    </button>


    </div>


    </div>


    <button onclick="addProduct(this)">
    ➕ Добавить товар
    </button>


    <label>Оплата</label>

    <select>
    <option>Нал</option>
    <option>Перевод</option>
    <option>Терминал</option>
    </select>


    <label>Сумма оплаты</label>
    <input type="number">


    <label>Время</label>
    <input type="text">


    <button onclick="removeClient(this)">
    ❌ Удалить клиента
    </button>


    `;


    clients.appendChild(client);

}



function removeClient(button) {

    let client = button.parentElement;

    client.remove();

}



function createReport(){

    alert("Отчет будет сформирован на следующем этапе 🍓");

}
