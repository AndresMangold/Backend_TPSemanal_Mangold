    const fs = require('fs').promises;

    class ProductManager {
        constructor(filePath) {
            this.products = [];
            this.filePath = filePath;
            this.init();
        }

        async init() {
            await this.loadProducts();
        }

        async loadProducts() {
            try {
                const data = await fs.readFile(this.filePath, 'utf8');
                this.products = JSON.parse(data);
            } catch (err) {
                console.error('Error leyendo el archivo:', err);
            }
        }

        async saveProducts() {
            try {
                await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2));
            } catch (err) {
                console.error('Error escribiendo el archivo:', err);
            }
        }

        async addProduct(title, description, price, thumbnail, code, stock) {
            if (!title || !description || !price || !thumbnail || !code || stock === null) {
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
            await this.saveProducts(); 
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

    if (require.main === module) {
        (async () => {
            const productManager = new ProductManager('./src/products.json');
    
            await Promise.all([
                productManager.addProduct("Nuevo Producto0", "Descripción del nuevo producto0", 29.99, "imagen_nuevo_producto.jpg", "P001", 75),
                productManager.addProduct("Nuevo Producto2", "Descripción del nuevo producto2", 19.99, "imagen_nuevo_producto.jpg", "P002", 85),
                productManager.addProduct("Nuevo Producto3", "Descripción del nuevo producto3", 39.99, "imagen_nuevo_producto.jpg", "P003", 95),
                productManager.addProduct("Nuevo Producto4", "Descripción del nuevo producto4", 39.99, "imagen_nuevo_producto.jpg", "P004", 95),
                productManager.addProduct("Nuevo Producto5", "Descripción del nuevo producto5", 39.99, "imagen_nuevo_producto.jpg", "P005", 95),
                productManager.addProduct("Nuevo Producto6", "Descripción del nuevo producto6", 39.99, "imagen_nuevo_producto.jpg", "P006", 95),
                productManager.addProduct("Nuevo Producto7", "Descripción del nuevo producto7", 39.99, "imagen_nuevo_producto.jpg", "P007", 95),
                productManager.addProduct("Nuevo Producto8", "Descripción del nuevo producto8", 39.99, "imagen_nuevo_producto.jpg", "P008", 95),
                productManager.addProduct("Nuevo Producto9", "Descripción del nuevo producto9", 39.99, "imagen_nuevo_producto.jpg", "P009", 95),
                productManager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25),
            ]);
    
        })();
    }

    module.exports = ProductManager;
