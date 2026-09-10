import { validateProductUpdate } from "./products.service.ts";

import { Request, Response } from "express";
import { validateProduct, validateDeleteProduct} from "./products.service.ts"
import { deleteProductById } from "./products.repository.ts"

function getProducts(req:Request, res:Response){
    res.send("You are viewing all the products");
}

async function updateProductById(req:Request, res:Response){

    try{
        const productId = req.params.id;
        const productUpdates = req.body;
        const userId = req.user
        const response = await validateProductUpdate(productUpdates, productId);
        if ( response ){
            res.status(200).json({
                "message": "Product successfully updated."
            });
        } else{
            res.status(404).json({
                "message": "Product does not exist"
            });
        }
    } catch(error){
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
}



async function addProduct(req:Request, res:Response){
    const productDetails = req.body;
    const userId = Number(req.user.id);
    const addedProduct = await validateProduct(productDetails, userId);
    console.log(userId);
    if (addedProduct){
        res.status(201).json({
            addedProduct
        })
    }else{
        res.status(404).json({
            "message": "User not found"
        });
    }
}

async function deleteProduct(req: Request, res: Response){
    const productId = req.params.id;
    const response = await validateDeleteProduct(productId);
    console.log(response)
    if (!response){
        res.status(404).json({
            "message": "Product does not exist"
        })
    }else{
        res.status(200).json({
            "message": "Product has been successfully removed"
        })
    }
}


export {
    getProducts,
    updateProductById,
    addProduct,
    deleteProduct
}