let catalog = JSON.parse(localStorage.getItem("catalog")) || [];

let history = JSON.parse(localStorage.getItem("history")) || [];

let clientCount = 1;


// ==========================
// СОХРАНЕНИЕ
// ==========================

function saveCatalog(){

    localStorage.setItem(
        "catalog",
        JSON.stringify(catalog)
    );

}


function saveHistory(){

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}



// ==========================
// ФОРМАТ ДЕНЕГ
// ==========================

function formatMoney(value){

    return Number(value || 0)
    .toLocaleString("ru-RU");

}



// ==========================
// КАТАЛОГ
// ==========================


function addCatalogItem(){

    let name = document.getElementById("newName").value;

    let price = Number(
        document.getElementById("newPrice").value
    );

    let category =
    document.getElementById("newCategory").value;


    let unit =
    document.getElementById("newUnit").value;



    if(!name || !price){

        alert("Заполните название и цену");

        return;

    }



    catalog.push({

        name:name,

        price:price,

        category:category,

        unit:unit

    });



    saveCatalog();



    document.getElementById("newName").value="";
    document.getElementById("newPrice").value="";


    renderCatalog();

}




function renderCatalog(){

    let list =
    document.getElementById("catalogList");


    if(!list) return;



    list.innerHTML="";



    catalog.forEach((item,index)=>{


        let block =
        document.createElement("div");


        block.className="card";


        block.innerHTML=`

        <b>${item.name}</b><br>

        Цена: ${formatMoney(item.price)}₽<br>

        Ед: ${item.unit}<br>

        Категория: ${item.category}

        <br><br>

        <button onclick="deleteCatalogItem(${index})">

        ❌ Удалить

        </button>

        `;


        list.appendChild(block);


    });


}




function deleteCatalogItem(index){

    catalog.splice(index,1);

    saveCatalog();

    renderCatalog();

}




// ==========================
// ТОВАРЫ В ПРОДАЖЕ
// ==========================


function loadCatalog(select){


    if(!select) return;


    select.innerHTML="";


    let first =
    document.createElement("option");


    first.value="";

    first.textContent=
    "Выберите товар";


    select.appendChild(first);




    catalog.forEach((item,index)=>{


        let option =
        document.createElement("option");


        option.value=index;


        option.textContent =
        item.name +
        " — " +
        formatMoney(item.price) +
        "₽";


        select.appendChild(option);


    });


}




function calculateProduct(product){


    let select =
    product.querySelector(".productSelect");


    let quantity =
    Number(
        product.querySelector(".quantity").value
    );



    let total =
    product.querySelector(".productTotal");



    let item =
    catalog[select.value];



    if(item){

        total.textContent =
        formatMoney(item.price * quantity);

    }

    else{

        total.textContent="0";

    }// ==========================
// ДОБАВЛЕНИЕ ТОВАРА К КЛИЕНТУ
// ==========================


function addProduct(button){


    let products =
    button.previousElementSibling;



    let product =
    document.createElement("div");


    product.className="product";



    product.innerHTML=`

    <label>Выбрать товар</label>

    <select class="productSelect"></select>


    <label>Количество</label>

    <input class="quantity" type="number" value="1">


    <label>Дополнение</label>

    <input class="productInfo" type="text"
    placeholder="290гр, N122, скидка">


    <p>
    Сумма:
    <span class="productTotal">0</span>₽
    </p>


    <button onclick="removeProduct(this)">
    ❌ Удалить товар
    </button>

    `;



    products.appendChild(product);



    loadCatalog(
        product.querySelector(".productSelect")
    );


}



function removeProduct(button){

    button.parentElement.remove();

}




// ==========================
// ДОБАВЛЕНИЕ КЛИЕНТА
// ==========================


function addClient(){


    clientCount++;


    let clients =
    document.getElementById("clients");



    let client =
    document.createElement("div");



    client.className="client card";



    client.innerHTML=`

    <h2>Клиент №${clientCount}</h2>


    <div class="products">


    <div class="product">


    <label>Выбрать товар</label>

    <select class="productSelect"></select>


    <label>Количество</label>

    <input class="quantity" type="number" value="1">


    <label>Дополнение</label>

    <input class="productInfo" type="text">


    <p>
    Сумма:
    <span class="productTotal">0</span>₽
    </p>


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



    loadCatalog(
        client.querySelector(".productSelect")
    );


}



function removeClient(button){

    button.parentElement.remove();

}




// ==========================
// АВТОРАСЧЕТ ЦЕНЫ
// ==========================


document.addEventListener("change",function(e){


    if(
    e.target.classList.contains("productSelect") ||
    e.target.classList.contains("quantity")
    ){


        let product =
        e.target.closest(".product");


        calculateProduct(product);


    }


});




// ==========================
// СОЗДАНИЕ ОТЧЕТА
// ==========================


function createReport(){


    let report="";



    let date =
    document.getElementById("date").value;



    if(date){


        let d =
        new Date(date);



        let day =
        String(d.getDate())
        .padStart(2,"0");


        let month =
        String(d.getMonth()+1)
        .padStart(2,"0");



        report += day+"."+month+"\n\n";


    }



    let color =
    document.getElementById("colorCash").value;



    let fruit =
    document.getElementById("fruitCash").value;



    report +=
    "Цвет Касса: "+
    formatMoney(color)+"\n";


    report +=
    "Фрукт касса: "+
    formatMoney(fruit)+"\n\n";



    let nal=0;

    let transfer=0;

    let terminal=0;



    let clients =
    document.querySelectorAll(".client");



    clients.forEach((client,index)=>{


        report +=
        "Клиент: "+
        (index+1)+"\n";



        let products =
        client.querySelectorAll(".product");



        products.forEach(product=>{


            let select =
            product.querySelector(".productSelect");



            let item =
            catalog[select.value];



            if(item){


                let quantity =
                product.querySelector(".quantity").value;



                let info =
                product.querySelector(".productInfo").value;



                report +=
                item.name+
                " - "+
                quantity+
                item.unit;



                if(info){

                    report +=
                    " ("+info+")";

                }


                report+="\n";


            }


        });



        let payment =
        client.querySelector(".payment").value;



        let sum =
        Number(
        client.querySelector(".paymentSum").value || 0
        );



        if(payment=="Нал") nal+=sum;

        if(payment=="Перевод") transfer+=sum;

        if(payment=="Терминал") terminal+=sum;



        report+="\n("+payment+" "+
        formatMoney(sum)+"₽";



        let time =
        client.querySelector(".paymentTime").value;



        if(time){

            report+=" "+time;

        }



        report+=")\n\n";


    });



    let expenses =
    document.getElementById("expenses").value;



    report+="Расход: ";

    report+= expenses ? expenses : "небыло";


    report+="\n\n";



    report+="Нал: "+
    formatMoney(nal)+"₽\n";


    report+="Перевод: "+
    formatMoney(transfer)+"₽\n";



    if(terminal){

        report+="Терминал: "+
        formatMoney(terminal)+"₽\n";

    }



    report+="\nПо клубникам:\n";


    report+=
    document.getElementById("strawberryInfo").value;



    history.push({

        date:date,

        text:report

    });



    saveHistory();



    alert(report);


}




// ==========================
// ЗАГРУЗКА
// ==========================


document.addEventListener("DOMContentLoaded",()=>{


    document
    .querySelectorAll(".productSelect")
    .forEach(select=>{

        loadCatalog(select);

    });



    renderCatalog();


});


}
