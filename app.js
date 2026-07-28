let clientCount = 1;


function formatMoney(number) {
    return Number(number || 0).toLocaleString("ru-RU");
}


// Добавить товар
function addProduct(button) {

    let products = button.previousElementSibling;

    let product = document.createElement("div");

    product.className = "product";

    product.innerHTML = `

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

    `;

    products.appendChild(product);

}



// Удалить товар
function removeProduct(button){

    button.parentElement.remove();

}



// Добавить клиента
function addClient(){

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



// Удалить клиента
function removeClient(button){

    button.parentElement.remove();

}



// Создать отчет
function createReport(){

    let date = document.getElementById("date").value;

    let colorCash = document.getElementById("colorCash").value;

    let fruitCash = document.getElementById("fruitCash").value;


    let report = "";


    report += date + "\n\n";


    if(colorCash){
        report += "Цвет Касса: " + formatMoney(colorCash) + "\n";
    }


    if(fruitCash){
        report += "Фрукт касса: " + formatMoney(fruitCash) + "\n";
    }


    report += "\n";


    let nal = 0;
    let transfer = 0;
    let terminal = 0;


    let clients = document.querySelectorAll(".client");


    clients.forEach((client,index)=>{


        report += "Клиент: " + (index + 1) + "\n";


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



        report += "(" + payment + " " + formatMoney(sum) + "₽";


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



    report += "Нал: " + formatMoney(nal) + "₽\n";

    report += "Перевод: " + formatMoney(transfer) + "₽\n";


    if(terminal){

        report += "Терминал: " + formatMoney(terminal) + "₽\n";

    }


    report += "\nПо клубникам: продаж небыло";



    showReport(report);

}




function showReport(text){


    let old = document.getElementById("reportWindow");


    if(old){
        old.remove();
    }


    let box = document.createElement("div");

    box.id = "reportWindow";


    box.innerHTML = `

    <h2>📋 Отчет</h2>

    <textarea>${text}</textarea>

    <button onclick="copyReport()">
    📋 Скопировать
    </button>

    <button onclick="this.parentElement.remove()">
    Закрыть
    </button>

    `;


    document.body.appendChild(box);


}



function copyReport(){

    let text = document.querySelector("#reportWindow textarea").value;

    navigator.clipboard.writeText(text);

    alert("Отчет скопирован ✅");

}
