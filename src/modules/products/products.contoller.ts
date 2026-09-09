import { Request, Response } from "express";
import { validateProduct} from "./products.service.ts"

function getProducts(req:Request, res:Response){
    res.send("You are viewing all the products");
}

function getProductById(req:Request, res:Response){
    res.send("You are viewing a product retrieved by ID");
}

function addProduct(req:Request, res:Response){
    const productDetails = req.body;
    const addedProduct = validateProduct(productDetails, 11);
    res.send("You added a new product");
}

export {
    getProducts,
    getProductById,
    addProduct
}