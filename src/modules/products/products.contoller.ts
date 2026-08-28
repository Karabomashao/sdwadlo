import { Request, Response } from "express";

function getProducts(req:Request, res:Response){
    res.send("You are viewing all the products");
}

function getProductById(req:Request, res:Response){
    res.send("You are viewing a product retrieved by ID");
}

function addProduct(req:Request, res:Response){
    const productDetails = req.body;
    console.log(productDetails);
    res.send("You added a new product");
}

export {
    getProducts,
    getProductById,
    addProduct
}