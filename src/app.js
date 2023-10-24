import express from "express";
import RouterProducts from "./classes/productManager.js"

const app = express();

app.use(express.urlencoded({ extended: true }));

const routerProducts = new RouterProducts();
app.get('/products', async (req, res) => {
  const data = req.query.limit

  res.send(await routerProducts.getProducts(data))
});

app.get('/products/:id', async (req, res) => {
    const data = req.params.id;

    res.send(await routerProducts.getProductById(data))
});


app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080.');
});