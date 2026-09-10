import {addProduct, getProductById, updateProductById, deleteProductById } from "./products.repository.ts";
import { getUserById } from "../auth/auth.repository";

export async function validateProduct(productDetails: object, userId: number){
    try{
        const userExist = await getUserById(userId);
        // console.log(userExist);
        if (userExist.length === 0){
            return false;
        }else{
            const product = await addProduct(productDetails, userId);
            return product;
        }
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



