const ProductManager = require('./productManager');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./src/products.json');

productManager.init().catch(error => {
    console.error('Error al inicializar ProductManager:', error);
});

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        
        if (limit && (isNaN(limit) || parseInt(limit) <= 0)) {
            return res.status(400).send('El límite debe ser un número positivo');
        }
        
        const products = productManager.getProducts();

        if (limit) {
            res.json(products.slice(0, parseInt(limit)));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/products/:pid', (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        
        if (isNaN(productId)) {
            return res.status(400).send('El ID del producto debe ser un número');
        }
        
        const product = productManager.getProductById(productId);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.set('json spaces', 2);

app.listen(8080, () => {
    console.log('Servidor listo en puerto 8080');
});
