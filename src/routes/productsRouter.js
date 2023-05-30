import { Router } from "express";
import { ProductManager } from "../prodManager/ProductManager.js";

const router = Router();
const productManager = new ProductManager('./prodManager/database.json');

router.get('/', async(req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const prod = await productManager.getProducts();
        const limitProd = limit >= 0 ? limit : prod.length;
        res.send(prod.slice(0, limitProd));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const prodID = parseInt(req.params.pid)
        const prod = await productManager.getProductByID(prodID);
        res.send(prod);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.post('/', async (req, res) =>{
    try{
        const {
            title, 
            description, 
            price, 
            url, 
            code, 
            stock, 
            category
        } = req.body;
        await productManager.addProduct(title, description, price, url, code, stock, category);
        res.send("Producto Agregado");
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }

})

router.put("/:pid", async (req, res) =>{
    try{
        const prodID = parseInt(req.params.pid);
        const newObject = req.body;
        await productManager.updateProduct(prodID, newObject);
        res.send("Producto actualizado");
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.delete("/:pid", async (req, res) => {
    try{
        const prodID = parseInt(req.params.pid);
        const prodDelete = await productManager.deleteProduct(prodID);
        if(!prodDelete){
            res.send("Eliminado")
        }else{
            res.send("No existe")
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})
export default router;