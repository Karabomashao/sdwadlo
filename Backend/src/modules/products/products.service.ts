import {addProduct, getProductById, updateProductById, deleteProductById, addProductColour, addProductSize, addFilePath } from "./products.repository.ts";
import { getUserById } from "../auth/auth.repository";
import { UUID } from "node:crypto";

export async function validateProduct(productDetails: object, userId: string){
    try{

            const product = await addProduct(productDetails, userId);
            const productId = product[0].id
      
            const {colours, sizes, filepath} = productDetails;

            const colourRows = colours.map((colourId) => ({
                product_id: productId,
                colour_id: colourId
            }))

            const sizeRows = sizes.map((sizeId) => ({
                size_id: sizeId,
                product_id: productId
            }))

            const colour = await addProductColour(colourRows);
            const size = await addProductSize(sizeRows);
            const filePath = await addFilePath(filepath, productId);

            return product;
    }catch(error){
        console.error(error.message);
        return error.message;
    }

}

export async function validateProductUpdate(productUpdates: object, id: number){

    try{
        const productById = await getProductById(id);
        if (productById.length === 0){
            return false;
        }
        const response = await updateProductById(productUpdates, id);
        return response;
    } catch(error){
        return error
    }
}

export async function validateDeleteProduct(id: number){
    
    try{
        const productById = await getProductById(id);
        if (productById.length === 0){
            return false;
        }
        
        const response = await deleteProductById(id);
        return response;
    } catch(error){
        return error
    }
}



