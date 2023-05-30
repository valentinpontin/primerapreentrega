import express from 'express';
import productsRoutes from "./routes/productsRouter.js"
import cartsRoutes from "./routes/cartsRouter.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(8080, () => {
    console.log('Servidor iniciado')
})