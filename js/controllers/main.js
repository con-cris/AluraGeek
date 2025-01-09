import { servicesProduct } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const noProductsMessage = document.querySelector(".productos__mensaje"); // Selecciona la leyenda

const form = document.querySelector("[data-form]");

function createCard({nombre, precio, imagen, id}) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="img-container">
            <img src="${imagen}"  alt="imagen producto">
        </div>
        <div class="card-container--info">
            <p>${nombre}</p>
            <div class="card-container--value">
                <p>${precio}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="./img/trashIcon.png" alt="Eliminar producto">                
                </button>                 
            </div>            
        </div>
    `;
    return card;
}

const toggleNoProductsMessage = () => {
    if (productContainer.children.length > 0) {
        noProductsMessage.style.display = "none"; // Oculta la leyenda
    } else {
        noProductsMessage.style.display = "block"; // Muestra la leyenda
    }
};

const renderProducts = async () => {
    try {
        const listProducts = await servicesProduct.productsList();
        listProducts.forEach(product => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });
        toggleNoProductsMessage(); // Llama la función para verificar productos

    }
    catch (error) {
        console.log(error);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault(); //Evita el comportamiento por defecto del browser
    const nombre =  document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value; 
     
    try {
        const newProduct = await servicesProduct.createProduct(nombre, precio, imagen);
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);
        toggleNoProductsMessage(); // Llama la función para verificar productos

    }
    catch (error) {
        console.log(error);
    }
    form.reset(); //Limpia los campos del formulario
}
);


productContainer.addEventListener("click", async (event) => {
    const button = event.target.closest(".delete-button"); // Encuentra el botón más cercano
    if (button) {
        const id = button.dataset.id; // Obtén el ID del producto
        try {
            await servicesProduct.deleteProduct(id); // Llama al servicio DELETE
            button.closest(".card").remove(); // Elimina la tarjeta del DOM
            toggleNoProductsMessage(); // Llama la función para verificar productos
        } catch (error) {
            console.log(`Error al eliminar el producto: ${error.message}`);
        }
    }
});


renderProducts()

