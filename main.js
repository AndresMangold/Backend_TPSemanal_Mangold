class Productcases {
    constructor () {
        this.products = [];
    }

    addProduct (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todas las referencias deben ser completadas');
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error('El código ya existe');
            return;
        }

        const id = this.products.length + 1;

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('Producto no encontrado');
            return null;
        }
    }
}

let cases = new Productcases();

cases.addProduct('Manzana', 'Roja', 200, '1.jpg', 1, 50);
cases.addProduct('Naranja', 'Naranja', 300, '2.jpg', 2, 60);
cases.addProduct('Pera', 'Amarilla', 400, '3.jpg', 3, 70);

console.log(cases.getProducts());
console.log(cases.getProductById(1));
console.log(cases.getProductById(2));
console.log(cases.getProductById(5)); 
