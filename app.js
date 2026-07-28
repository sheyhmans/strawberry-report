let catalog = JSON.parse(localStorage.getItem("catalog")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

let clientCounter = 1;


// =======================
// СОХРАНЕНИЕ
// =======================

function saveCatalog(){
    localStorage.setItem("catalog", JSON.stringify(catalog));
}


function saveHistory(){
    localStorage.setItem("history", JSON.stringify(history));
}


// =======================
// ФОРМАТ ДЕНЕГ
// =======================

function money(value){
    return Number(value || 0).toLocaleString("ru-RU");
}



// =======================
// КАТАЛОГ
// =======================

function addCatalogItem(){

    let name = document.getElementById("newName").value;
    let price = Number(document.getElementById("newPrice").value);
    let category = document.getElementById("newCategory").value;
    let unit = document.getElementById("newUnit").value;


    if(!name || !price){
        alert("Введите название и цену");
        return;
    }


    catalog.push({
        name,
        price,
        category,
        unit
    });


    saveCatalog();

    renderCatalog();

    fillProducts();


    document.getElementById("newName").value="";
    document.getElementById("newPrice").value="";

}



function renderCatalog(){

    let box=document.getElementById("catalogList");

    if(!box) return;


    box.innerHTML="";


    catalog.forEach((item,index)=>{


        let div=document.createElement("div");

        div.className="card";


        div.innerHTML=`

        <b>${item.name}</b><br>

        Цена: ${money(item.price)}₽<br>

        Ед: ${item.unit}<br>

        Категория: ${item.category}

        <br><br>

        <button onclick="deleteCatalog(${index})">
        ❌ Удалить
        </button>

        `;


        box.appendChild(div);

    });

}



function deleteCatalog(index){

    catalog.splice(index,1);

    saveCatalog();

    renderCatalog();

}




// =======================
// ТОВАРЫ
// =======================


function fillProducts(){

    catalog = JSON.parse(localStorage.getItem("catalog")) || [];


    document.querySelectorAll(".productSelect")
    .forEach(select=>{


        let currentValue = select.value;


        select.innerHTML="";


        let first=document.createElement("option");

        first.value="";

        first.textContent="Выберите товар";

        select.appendChild(first);



        catalog.forEach((item,index)=>{


            let option=document.createElement("option");


            option.value=index;


            option.textContent =
            item.name +
            " " +
            money(item.price) +
            "₽";


            select.appendChild(option);


        });


        if(currentValue){

            select.value=currentValue;

        }


    });

}




function calculateProduct(product){


    let select=product.querySelector(".productSelect");

    let quantity=
    Number(product.querySelector(".quantity").value || 0);


    let custom=
    Number(product.querySelector(".customPrice").value || 0);



    let item=catalog[select.value];


    let price=0;


    if(custom){

        price=custom;

    }
    else if(item){

        price=item.price;

    }



    let total=price*quantity;



    product.querySelector(".productTotal").textContent=
    money(total);



    return total;

}



function calculateClient(client){


    let total=0;


    client.querySelectorAll(".product")
    .forEach(product=>{


        total+=calculateProduct(product);


    });



    client.querySelector(".clientTotal").textContent=
    money(total);


}




document.addEventListener("input",function(e){


    let client=e.target.closest(".client");


    if(client){

        calculateClient(client);

    }

});



document.addEventListener("change",function(e){


    let client=e.target.closest(".client");


    if(client){

        calculateClient(client);

    }


});




// =======================
// КЛИЕНТЫ
// =======================


function addProduct(button){


    let list=button.previousElementSibling;


    let div=document.createElement("div");


    div.className="product";


    div.innerHTML=`

    <label>Товар</label>

    <select class="productSelect"></select>


    <label>Количество</label>

    <input class="quantity" type="number" value="1">


    <label>Дополнение</label>

    <input class="productInfo" type="text">


    <label>
    Своя цена
    </label>

    <input class="customPrice" type="number">


    <p>
    Сумма:
    <span class="productTotal">0</span>₽
    </p>


    <button onclick="removeProduct(this)">
    ❌ Удалить товар
    </button>

    `;


    list.appendChild(div);


    fillProducts();

}




function removeProduct(button){

    button.parentElement.remove();

}



function addClient(){


    clientCounter++;


    let clients=document.getElementById("clients");


    let div=document.createElement("div");


    div.className="client card";


    div.innerHTML=`

    <h2>Клиент №${clientCounter}</h2>


    <div class="products">

    <div class="product">

    <select class="productSelect"></select>

    <input class="quantity" type="number" value="1">

    <input class="productInfo" type="text">

    <input class="customPrice" type="number">


    <p>
    Сумма:
    <span class="productTotal">0</span>₽
    </p>

    </div>

    </div>


    <button onclick="addProduct(this)">
    ➕ Добавить товар
    </button>


    <h3>
    Итого:
    <span class="clientTotal">0</span>₽
    </h3>


    <select class="payment">

    <option>Нал</option>

    <option>Перевод</option>

    <option>Терминал</option>

    </select>


    <input class="paymentTime" placeholder="01:27">


    <button onclick="removeClient(this)">
    ❌ Удалить клиента
    </button>

    `;


    clients.appendChild(div);


    fillProducts();

}



function removeClient(button){

    button.parentElement.remove();

}



// =======================
// ОТЧЕТ
// =======================


function createReport(){


    let date=document.getElementById("date").value;


    let d=new Date(date);


    let dateText="";


    if(date){

        dateText=
        String(d.getDate()).padStart(2,"0")
        +"."+
        String(d.getMonth()+1).padStart(2,"0");

    }



    let report=dateText+"\n\n";


    report+="Цвет Касса: "
    +money(document.getElementById("colorCash").value)
    +"\n";


    report+="Фрукт касса: "
    +money(document.getElementById("fruitCash").value)
    +"\n\n";



    let nal=0;
    let transfer=0;
    let terminal=0;



    document.querySelectorAll(".client")
    .forEach((client,index)=>{


        report+="Клиент: "+(index+1)+"\n";



        client.querySelectorAll(".product")
        .forEach(product=>{


            let select=product.querySelector(".productSelect");

            let item=catalog[select.value];


            if(item){


                let qty=
                product.querySelector(".quantity").value;


                let info=
                product.querySelector(".productInfo").value;


                report +=
item.name +
" - " +
qty +
(item.unit ? item.unit : "шт");


                if(info){

                    report+=" ("+info+")";

                }


                report+="\n";


            }


        });



        let sum=
        Number(client.querySelector(".clientTotal").textContent.replace(/\s/g,""));



        let pay=
        client.querySelector(".payment").value;



        if(pay=="Нал") nal+=sum;

        if(pay=="Перевод") transfer+=sum;

        if(pay=="Терминал") terminal+=sum;



        report+="("+pay+" "+money(sum)+"₽";


        let time=
        client.querySelector(".paymentTime").value;


        if(time){

            report+=" "+time;

        }


        report+=")\n\n";


    });



    report+="Расход: "
    +(document.getElementById("expenses").value || "небыло")
    +"\n\n";


    report+="Нал: "+money(nal)+"₽\n";

    report+="Перевод: "+money(transfer)+"₽\n";


    if(terminal){

        report+="Терминал: "+money(terminal)+"₽\n";

    }


    report+="\nПо клубникам:\n";

    report+=document.getElementById("strawberryInfo").value;



    history.push({

        date:dateText,

        text:report

    });


    saveHistory();


    document.getElementById("reportResult").style.display="block";

    document.getElementById("reportText").value=report;


}



function copyReport(){

    navigator.clipboard.writeText(
        document.getElementById("reportText").value
    );

    alert("Отчет скопирован");

}



// =======================
// ИСТОРИЯ
// =======================


function showHistory(){


    let box=document.getElementById("historyList");


    if(!box) return;


    box.innerHTML="";


    history.forEach((item,index)=>{


        let div=document.createElement("div");


        div.className="card";


        div.innerHTML=`

        <b>${item.date}</b>

        <textarea>${item.text}</textarea>


        <button onclick="copyOld(${index})">
        📋 Копировать
        </button>

        `;


        box.appendChild(div);


    });


}



function copyOld(index){

    navigator.clipboard.writeText(
        history[index].text
    );

}



function clearHistory(){

    history=[];

    saveHistory();

    showHistory();

}



// =======================
// СОХРАНЕНИЕ ТЕКУЩЕЙ СМЕНЫ
// =======================


function saveCurrentShift(){

    let data = {

        date:
        document.getElementById("date")?.value || "",


        colorCash:
        document.getElementById("colorCash")?.value || "",


        fruitCash:
        document.getElementById("fruitCash")?.value || "",


        expenses:
        document.getElementById("expenses")?.value || "",


        strawberryInfo:
        document.getElementById("strawberryInfo")?.value || "",


        clients:
        document.getElementById("clients")?.innerHTML || ""

    };


    localStorage.setItem(
        "currentShift",
        JSON.stringify(data)
    );


    alert("Смена сохранена 💾");

}




function loadCurrentShift(){

    let saved =
    localStorage.getItem("currentShift");


    if(!saved){

        alert("Сохраненной смены нет");

        return;

    }



    let data =
    JSON.parse(saved);



    if(document.getElementById("date"))
    document.getElementById("date").value=data.date;



    if(document.getElementById("colorCash"))
    document.getElementById("colorCash").value=data.colorCash;



    if(document.getElementById("fruitCash"))
    document.getElementById("fruitCash").value=data.fruitCash;



    if(document.getElementById("expenses"))
    document.getElementById("expenses").value=data.expenses;



    if(document.getElementById("strawberryInfo"))
    document.getElementById("strawberryInfo").value=data.strawberryInfo;



    if(document.getElementById("clients")){

        document.getElementById("clients").innerHTML=data.clients;

        fillProducts();

    }



    alert("Смена восстановлена 🔄");

}




function clearCurrentShift(){

    localStorage.removeItem("currentShift");


    alert("Сохраненная смена удалена 🗑");

}
document.addEventListener("DOMContentLoaded",()=>{

    renderCatalog();

    fillProducts();

    showHistory();

});
