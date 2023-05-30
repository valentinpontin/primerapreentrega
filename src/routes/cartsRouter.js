import { Router } from "express";
import { CartManager } from "../cartManager/cartMaganer.js"

const router = Router();
const cartManager = new CartManager('./cartManager/cart.json');

router.post("/", async (req, res) => {
    try{
        const newCart = await cartManager.addCart();
        res.send(newCart);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.get("/:cid", async(req, res) => {
    try{
        const cartID = parseInt(req.params.cid);
        const cart = await cartManager.getCartByID(cartID);
        res.send(cart);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.post("/:cid/product/:pid", async(req, res) => {
    try{
        const cartID = parseInt(req.params.cid);
        const prodID = parseInt(req.params.pid);
        const cartProd = await cartManager.addProductCart(cartID, prodID);
        res.send(cartProd);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})





export default router;