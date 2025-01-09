const BASE_URL = 'https://677fec210476123f76a8bf9a.mockapi.io/productos';

const productsList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const createProduct = async (nombre, precio, imagen) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                precio,
                imagen
            })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}


const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`No se pudo eliminar el producto con ID ${id}`);
        }
        console.log(`Producto con ID ${id} eliminado con éxito.`);
    } catch (error) {
        console.log(`Error eliminando producto: ${error.message}`);
    }
};


export const servicesProduct = {    
    productsList, 
    createProduct,
    deleteProduct
};