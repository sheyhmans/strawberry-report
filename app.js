let clientCount = 1;


// Добавление товара
function addProduct(button) {

    let products = button.previousElementSibling;

    let product = document.createElement("div");

    product.className = "product";


    product.innerHTML = `

    <label>Название товара</label>
    <input class="productName" type="text" placeholder="Название товара">


    <label>Количество</label>
    <input class="productCount" type="text" placeholder="Количество">


    <label>Сумма товара</label>
    <input class="productPrice" type="number" placeholder="Сумма">


    <label>Дополнение</label>
    <input class="productInfo" type="text" placeholder="290гр, N122, скидка">


    <button onclick="removeProduct(this)">
    ❌ Удалить товар
    </button>

    `;


    products.appendChild(product);

}



// Удаление товара
function removeProduct(button) {

    button.parentElement.remove();

}



// Добавление клиента
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
    <input class="productName" type="text">


    <label>Количество</label>
    <input class="productCount" type="text">


    <label>Сумма товара</label>
    <input class="productPrice" type="number">


    <label>Дополнение</label>
    <input class="productInfo" type="text">


    <button onclick="removeProduct(this)">
    ❌ Удалить товар
    </button>


    </div>

    </div>


    <button onclick="addProduct(this)">
    ➕ Добавить товар
    </button>


    <label>Оплата</label>

    <select class="payment">
    <option>Нал</option>
    <option>Перевод</option>
    <option>Терминал</option>
    </select>


    <label>Сумма оплаты</label>

    <input class="paymentSum" type="number">


    <label>Время</label>

    <input class="paymentTime" type="text">


    <button onclick="removeClient(this)">
    ❌ Удалить клиента
    </button>

    `;


    clients.appendChild(client);

}



// Удаление клиента
function removeClient(button) {

    button.parentElement.remove();

}



// Формирование отчета
function createReport() {


    let date = document.getElementById("date").value;

    let colorCash = document.getElementById("colorCash").value;

    let fruitCash = document.getElementById("fruitCash").value;


    let report = "";



    report += date + "\n\n";


    if(colorCash){

        report += "Цвет Касса: " + Number(colorCash).toLocaleString("ru-RU") + "\n";

    }


    if(fruitCash){

        report += "Фрукт касса: " + Number(fruitCash).toLocaleString("ru-RU") + "\n\n";

    }



    let clients = document.querySelectorAll(".client");


    let nal = 0;

    let transfer = 0;

    let terminal = 0;



    clients.forEach((client,index)=>{


        report += "Клиент: " + (index+1) + "\n";


        let products = client.querySelectorAll(".product");



        products.forEach(product=>{


            let name = product.querySelector(".productName").value;

            let count = product.querySelector(".productCount").value;

            let info = product.querySelector(".productInfo").value;


            if(name){

                report += name;

                if(count){

                    report += " - " + count;

                }


                if(info){

                    report += " (" + info + ")";

                }


                report += "\n";

            }


        });



        let payment = client.querySelector(".payment").value;

        let sum = Number(client.querySelector(".paymentSum").value || 0);

        let time = client.querySelector(".paymentTime").value;


        if(payment === "Нал"){

            nal += sum;

        }


        if(payment === "Перевод"){

            transfer += sum;

        }


        if(payment === "Терминал"){

            terminal += sum;

        }



        report += "(" + payment + " " + sum.toLocaleString("ru-RU");


        if(time){

            report += " " + time;

        }


        report += ")\n\n";


    });



    let expenses = document.getElementById("expenses").value;



    if(expenses){

        report += "Расход: " + expenses + "\n\n";

    }

    else{

        report += "Расход: небыло\n\n";

    }



    report += "Нал: " + nal.toLocaleString("ru-RU") + "₽\n";

    report += "Перевод: " + transfer.toLocaleString("ru-RU") + "₽\n";


    if(terminal){

        report += "Терминал: " + terminal.toLocaleString("ru-RU") + "₽\n";

    }


    report += "\nПо клубникам: продаж небыло";



    alert(report);


}
