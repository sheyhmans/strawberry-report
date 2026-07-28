let catalog = JSON.parse(localStorage.getItem("catalog")) || [];

let history = JSON.parse(localStorage.getItem("history")) || [];

let clientCount = 1;



function saveCatalog(){

localStorage.setItem("catalog", JSON.stringify(catalog));

}



function saveHistory(){

localStorage.setItem("history", JSON.stringify(history));

}




// ======================
// КАТАЛОГ
// ======================


function addCatalogItem(){


let name = document.getElementById("newName").value;

let price = Number(document.getElementById("newPrice").value);

let category = document.getElementById("newCategory").value;



if(!name || !price){

alert("Заполните название и цену");

return;

}



catalog.push({

name:name,

price:price,

category:category

});



saveCatalog();


document.getElementById("newName").value="";

document.getElementById("newPrice").value="";


renderCatalog();


}



function renderCatalog(){


let list=document.getElementById("catalogList");


if(!list) return;



list.innerHTML="";



catalog.forEach((item,index)=>{


let div=document.createElement("div");

div.className="card";


div.innerHTML=`

<b>${item.name}</b><br>

${item.category}<br>

Цена: ${item.price}₽

<br><br>

<button onclick="deleteCatalogItem(${index})">

❌ Удалить

</button>

`;



list.appendChild(div);


});


}



function deleteCatalogItem(index){


catalog.splice(index,1);

saveCatalog();

renderCatalog();


}




// ======================
// ТОВАРЫ В ПРОДАЖЕ
// ======================


function loadProductList(select){


select.innerHTML="";


let option=document.createElement("option");

option.textContent="Выберите товар";

option.value="";

select.appendChild(option);



catalog.forEach((item,index)=>{


let option=document.createElement("option");


option.value=index;

option.textContent=item.name+" "+item.price+"₽";


select.appendChild(option);



});


}



function updateProductPrice(product){


let select=product.querySelector(".productSelect");

let total=product.querySelector(".productTotal");

let quantity=Number(product.querySelector(".quantity").value);



let item=catalog[select.value];


if(item){

total.textContent=item.price*quantity;

}

else{

total.textContent=0;

}


}





document.addEventListener("change",function(e){


if(e.target.classList.contains("productSelect") || e.target.classList.contains("quantity")){


let product=e.target.closest(".product");

updateProductPrice(product);


}


});




// ======================
// КЛИЕНТЫ
// ======================



function addProduct(button){


let products=button.previousElementSibling;


let div=document.createElement("div");

div.className="product";


div.innerHTML=`

<label>Выбрать товар</label>

<select class="productSelect">

</select>


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

`;



products.appendChild(div);



loadProductList(div.querySelector(".productSelect"));


}



function removeProduct(button){

button.parentElement.remove();

}



function addClient(){


clientCount++;


let clients=document.getElementById("clients");



let client=document.createElement("div");


client.className="client card";



client.innerHTML=`

<h2>Клиент №${clientCount}</h2>


<div class="products">

<div class="product">

<select class="productSelect">

</select>


<input class="quantity" type="number" value="1">


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



loadProductList(client.querySelector(".productSelect"));



}



function removeClient(button){

button.parentElement.remove();

}





// ======================
// ОТЧЕТ
// ======================


function money(num){

return Number(num).toLocaleString("ru-RU");

}




function createReport(){


let report="";


let date=document.getElementById("date").value;


let color=document.getElementById("colorCash").value;

let fruit=document.getElementById("fruitCash").value;



report+=date+"\n\n";


report+="Цвет Касса: "+money(color)+"\n";

report+="Фрукт касса: "+money(fruit)+"\n\n";



let nal=0;

let transfer=0;

let terminal=0;



let clients=document.querySelectorAll(".client");



clients.forEach((client,index)=>{


report+="Клиент: "+(index+1)+"\n";



let products=client.querySelectorAll(".product");



products.forEach(product=>{


let select=product.querySelector(".productSelect");


let item=catalog[select.value];


let quantity=product.querySelector(".quantity").value;


let info=product.querySelector(".productInfo").value;



if(item){


report+=item.name+" - "+quantity;


if(info){

report+=" ("+info+")";

}


report+="\n";


}



});



let payment=client.querySelector(".payment").value;

let sum=Number(client.querySelector(".paymentSum").value);


if(payment=="Нал") nal+=sum;

if(payment=="Перевод") transfer+=sum;

if(payment=="Терминал") terminal+=sum;



report+="("+payment+" "+money(sum)+"₽";



let time=client.querySelector(".paymentTime").value;


if(time){

report+=" "+time;

}


report+=")\n\n";


});




let expenses=document.getElementById("expenses").value;


report+="Расход: ";

report+=expenses ? expenses : "небыло";


report+="\n\n";


report+="Нал: "+money(nal)+"₽\n";

report+="Перевод: "+money(transfer)+"₽\n";


if(terminal){

report+="Терминал: "+money(terminal)+"₽\n";

}



report+="\nПо клубникам:\n";

report+=document.getElementById("strawberryInfo").value;



history.push({

date:date,

text:report

});


saveHistory();



showReport(report);



}





function showReport(text){


alert(text);


}





// загрузка страниц

document.addEventListener("DOMContentLoaded",()=>{


let selects=document.querySelectorAll(".productSelect");


selects.forEach(select=>loadProductList(select));



renderCatalog();



});
