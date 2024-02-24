const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.products = [];
        
        this.filePath = filePath;
        
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.error('Error leyendo el archivo:', err);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error('Error escribiendo el archivo:', err);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || stock === null) {
            console.error('Todas las referencias deben ser completadas');
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error('El código ya existe');
            return;
        }

        const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;

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
        this.saveProducts();
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

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }
}

const productManager = new ProductManager('./productos.json');

module.exports = ProductManager;

