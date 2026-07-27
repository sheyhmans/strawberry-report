let productCount = 1;

function addProduct() {

productCount++;

let client = document.querySelector(".client");

let product = document.createElement("div");

product.className = "product";

product.innerHTML = `

<h3>Товар ${productCount}</h3>

<div class="field">
<label>Название товара</label>
<input type="text" placeholder="Название">
</div>

<div class="field">
<label>Количество</label>
<input type="number" placeholder="Количество">
</div>

<div class="field">
<label>Сумма товара</label>
<input type="number" placeholder="Сумма">
</div>

`;

client.insertBefore(product, client.querySelector("button"));

}
