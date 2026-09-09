import { addProduct } from "./products.repository.ts";

export async function validateProduct(productDetails: object){
    const product = await addProduct(productDetails)

    return product;
}