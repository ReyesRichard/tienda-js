"use strict"
let data = {};
const listaProductos = document.querySelector(".products-wrapper")
const containerCart = document.querySelector("#cart-list")
const cartMenu = document.querySelector(".cart")
const cartTrigger = document.querySelector("#cart-trigger")
const cartFloat = document.querySelector(".shop-cart-float")
const cartCleanCart = document.querySelector("#clean-cart")

let elementsCart = []

window.addEventListener("DOMContentLoaded", e=>{
    data = getData()
    // console.table(data)
    generateProducts(data)
    loadEventsLiseners()
})


// Functions
function loadEventsLiseners (){
    
    cartMenu.addEventListener("click", handleTriggerCart)
    // Cart Product
    listaProductos.addEventListener("click", addProductCart)
    containerCart.addEventListener("click", minusProductCart)
    containerCart.addEventListener("click", plusProductCart)
    containerCart.addEventListener("click", deleteProductCart)
    cartCleanCart.addEventListener("click", cleanProductsCart )
}

function addProductCart(e){
    e.preventDefault()
    if(e.target.classList.contains("product__add")){
        const productId = e.target.parentElement.parentElement.getAttribute("data-id")
        const productSelected = data.products.filter(item => item.id === parseInt(productId))

        const existProduct = elementsCart.some(item => item.id === productSelected[0].id)

        if(existProduct){
            const elementsCartToUpdate = elementsCart.map( item => {
                if(item.id === parseInt(productId)){
                    item.amount++
                    return item
                }
                else return item
            })
            elementsCart = [ ...elementsCartToUpdate ] 

            // const currentProduct = elementsCart.filter(item => item.id === parseInt(productId))

            // currentProduct[0].amount++

            // const elementsCartWithoutProduct = elementsCart.filter(item =>  item.id !== parseInt(productId))
            // elementsCart = [ ...elementsCartWithoutProduct, ...productSelected ] 

        }else{
            productSelected[0].amount = 1;
            elementsCart = [ ...elementsCart, ...productSelected ] 
            // console.group("Carrito")
            // console.table(elementsCart)
            // console.groupEnd()
        }
        generateCart()
    }
}

function minusProductCart(e){
    e.preventDefault()
    if(e.target.classList.contains("cart-list__item-minus")){
        console.log("minus")
        const productId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
        const product = elementsCart.find(item => item.id === parseInt(productId))
        // console.log(product)

        if (product.amount <= 1){
            const elementsCartToUpdate = elementsCart.filter(item => item.id !== parseInt(productId))
            elementsCart = [...elementsCartToUpdate]
            generateCart()
            return
        }

        if(product.amount > 1){
            const elementsCartToUpdate = elementsCart.map(item => {
                if(item.id === parseInt( productId)){
                    item.amount--
                    return item
                }else return item
            })
            
            elementsCart = [...elementsCartToUpdate]
            generateCart()
            return
        }
    }
}
function plusProductCart(e){
    e.preventDefault()
    if(e.target.classList.contains("cart-list__item-plus")){
        const productId = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")

        const elementsCartToUpdate = elementsCart.map(item => {
            if(item.id !== parseInt( productId) ) return item

            item.amount++
            return item
        })
        elementsCart = [...elementsCartToUpdate]
        generateCart()
    }
}

function deleteProductCart(e){
    e.preventDefault()
    if(e.target.classList.contains("cart-list__item-delete")){
        const productId = e.target.parentElement.parentElement.getAttribute("data-id")
        const elementsCartToUpdate = elementsCart.filter(item => item.id !== parseInt(productId))
        elementsCart = [...elementsCartToUpdate]
        generateCart()
       
    }
}

function cleanProductsCart(e){
    e.preventDefault()
    elementsCart = []
    generateCart()
}


function generateCart () {
    // clean cart
    containerCart.innerHTML = ""
    // while(containerCart.firstChild){
    //     containerCart.removeChild(containerCart.firstChild)
    // }
    // generate elementes in cart
    console.log(elementsCart)
    elementsCart.forEach(item => {
        const {id, imgs, title, price, amount} = item

        const row = document.createElement("div")
        row.classList.add("cart-list__item")
        row.setAttribute("data-id", `${id}`)
        row.innerHTML = `
            <div class="cart-list__item-img">
                <img src="${imgs[0] ? imgs[0]: ""}" alt="Titulo Producto" />
            </div>
            <div class="cart-list__item-info">
                <div class="cart-list__item-title" role=”contentinfo”> ${title}</div>
                <div class="cart-list__item-price">${price}</div>
                <div class="cart-list__item-amount"> 
                    <a href="#" class="fa-solid fa-minus cart-list__item-minus" alt="Quitar uno " role="button" arial-label="Quitar uno"></a>
                    ${amount}
                    
                    <a href="#" class="fa-solid fa-plus cart-list__item-plus" alt="Añadir uno" role="button"></a>
                </div>
                <div class="cart-list__item-delete" alt="Eliminar Productos"></div>
            </div>
        `
        containerCart.appendChild(row)
    })
}

function handleTriggerCart () {
    console.log(cartTrigger)
    if(cartTrigger.classList.contains("open")){
        cartTrigger.classList.remove("open")
        cartTrigger.classList.add("close")

        cartFloat.classList.remove("open")
        cartFloat.classList.add("close")
        
    }else{
        cartTrigger.classList.remove("close")
        cartTrigger.classList.add("open")
        cartFloat.classList.remove("close")
        cartFloat.classList.add("open")
    }
}

function generateProducts(data = {}){

    const products = data.products.map( (item, index) =>{

        const productEl = document.createElement("article")
        const productEl_img = document.createElement("img")
        const productEl_Info = document.createElement("div")
        const productEl_title = document.createElement("p")
        const productEl_price = document.createElement("p")
        const productEl_add = document.createElement("a")
    
        productEl.classList.add("product");
        productEl.dataset.id = item.id;
        productEl.setAttribute("arial-label", item.title);

        productEl_img.src = item.imgs[0];
        productEl_img.alt = item.title;
        productEl_img.title = item.title;

        productEl_Info.classList.add("product__info")

        productEl_title.textContent = item.title;
        productEl_title.classList.add("product__title");

        productEl_price.textContent = `$${item.price.toFixed(2)}`;
        productEl_price.classList.add("product__price");
        
        productEl_add.textContent = "Añadir al carrito";
        productEl_add.setAttribute("role", "button");
        productEl_add.setAttribute("href", "#");
        productEl_add.classList.add("btn");
        productEl_add.classList.add("btn-primary");
        productEl_add.classList.add("product__add");

        productEl_Info.appendChild(productEl_title)
        productEl_Info.appendChild(productEl_price)
        productEl_Info.appendChild(productEl_add)

        productEl.appendChild(productEl_img)
        productEl.appendChild(productEl_Info)

        return productEl
    })
    // console.log(products)

    products.map(item =>listaProductos.appendChild(item))
    // listaProductos.appendChild( products[0] )
}

// dummy data
function getData() {
    return {
        products: [
            {
                id: 0,
                title: "Celular A32",
                price: 3100.99,
                imgs: ["https://bytestore.com.mx/uploads/_/CELSMG2000-250x250-resize(1).jpg?token=ab47a32ca05a7e1e599b62d8268a5302"],
            },
            {
                id: 1,
                title: "Celular A03",
                price: 3800.10,
                imgs: ["https://prodeco.com.mx/uploads/_/CELSMG2050-250x250-resize(1).jpg?token=bd0be328c9d6e62a6d8aa4fa9f2a3475"],
            },
            {
                id: 2,
                title: "Celular PILCO",
                price: 830.50,
                imgs: ["https://habitar.com.ar/pub/media/catalog/product/cache/small_image/250x250/beff4985b56e3afdbeabfc89641a4582/1/6/16404.jpg"],
            },
            {
                id: 3,
                title: "Celular Moto G71 5G XT2169-1",
                price: 7051.00,
                imgs: ["https://landyconfort.com/3316-home_default/celular-moto-g200-5g.jpg"],
            },
            {
                id: 4,
                title: "Producto 4",
                price: 1800,
                imgs: ["https://dummyimage.com/250x250&text=Producto4"],
            },
            {
                id: 5,
                title: "Producto 5",
                price: 500.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto5"],
            },
            {
                id: 6,
                title: "Producto 6",
                price: 500.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto6"],
            },
            {
                id: 7,
                title: "Producto 7",
                price: 500.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto7"],
            },
            {
                id: 8,
                title: "Producto 8",
                price: 500.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto8"],
            },
            {
                id: 9,
                title: "Producto 9",
                price: 500.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto9"],
            },
            {
                id: 10,
                title: "Producto 10",
                price: 500.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto10"],
            },
            {
                id: 11,
                title: "Producto 11",
                price: 1100.99,
                imgs: ["https://dummyimage.com/250x250&text=Producto11"],
            },
        ],
        isFetching: false
    }
}