import {addProduct, getProductById, updateProductById, deleteProductById } from "./products.repository.ts";


export async function validateProduct(productDetails: object){
    try{
        const product = await addProduct(productDetails);
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



