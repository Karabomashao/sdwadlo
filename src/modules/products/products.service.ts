import { addProduct } from "./products.repository.ts";

export async function validateProduct(productDetails: object, adminId: int){
    console.log(productDetails);
    console.log(adminId);
    const product = await addProduct(productDetails, adminId)

    return product;
}