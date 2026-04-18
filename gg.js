let cart = JSON.parse(localStorage.getItem("cart")) || [];

let tabletNames = [
    "Panadol","Brufen","Disprin","Augmentin","Zyrtec","Calpol","Amoxil",
    "Cipro","Arinac","Flagyl","Ponstan","Neurobion","Surbex","Evion"
];

let syrupNames = [
    "Cough Syrup","Tussin","Benadryl","Histamine Syrup","Kids Care",
    "Bronco Syrup","Relief Syrup","FluGone","ChestClear","Vita Syrup"
];

let products = [];

// 🔥 Generate 1000 ITEMS
for(let i=1;i<=1000;i++){
    let isTablet = Math.random() > 0.5;

    let name = isTablet
        ? tabletNames[Math.floor(Math.random()*tabletNames.length)]
        : syrupNames[Math.floor(Math.random()*syrupNames.length)];

    products.push({
        id:i,
        name: name + " " + i,
        type: isTablet ? "Tablet" : "Syrup",
        price: Math.floor(Math.random()*500)+50
    });
}

let container = document.getElementById("products");

// render function
function display(list){
    container.innerHTML = "";

    list.forEach(p=>{
        container.innerHTML += `
        <div class="card">
            <h4>${p.name}</h4>
            <p>${p.type}</p>
            <p>Rs ${p.price}</p>
            <button onclick="addCart(${p.id})">Add to Cart</button>
        </div>
        `;
    });
}

display(products);

// search + filter
document.getElementById("search").addEventListener("input", function(){
    filterData();
});

document.getElementById("filter").addEventListener("change", filterData);

function filterData(){
    let search = document.getElementById("search").value.toLowerCase();
    let type = document.getElementById("filter").value;

    let filtered = products.filter(p=>{
        return (
            (type==="all" || p.type===type) &&
            p.name.toLowerCase().includes(search)
        );
    });

    display(filtered);
}

// cart
function addCart(id){
    let item = cart.find(x=>x.id===id);

    if(item){
        item.qty++;
    } else {
        let prod = products.find(x=>x.id===id);
        cart.push({...prod, qty:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart").innerText = "Cart: " + cart.length;
}

document.getElementById("cart").innerText = "Cart: " + cart.length;