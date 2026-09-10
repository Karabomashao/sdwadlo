import sql from "../../config/database.ts";

export async function getProductById(productId: number){

    try {
        const product = await sql`
            Select * FROM products
            WHERE id = ${productId}
        `
        return product;
    } catch(error){
        console.error(error.message);
    }
}

export async function updateProductById(productUpdates: Record<string, any>, productId: number){

    const allowedFields = [
        "product",
        "brand",
        "price",
        "colour_id",
        "size_id",
        "category_id",
        "gender_id",
        "description"
    ];
    const filteredUpdates = Object.entries(productUpdates).filter(([key, value]) => {
        return allowedFields.includes(key) && value !== undefined
    })
    const newUpdates = Object.fromEntries(filteredUpdates);

    try{
        const updatedProduct = await sql`
            Update products
            SET ${sql(newUpdates)}
            WHERE id = ${productId}
            RETURNING *
        `
        console.log(updatedProduct)
        return true;
    }catch(error){
        return error
    }

}

export async function addProduct(productDetails: object, userId: number){
    const {product, brand, price, colourId, sizeId, categoryId, genderId, description} = productDetails;

    try{
        const productMeta = await sql`
            INSERT INTO products (
                admin_id,
                product, 
                brand, 
                price,
                colour_id,
                size_id,
                category_id,
                gender_id,
                description
            )
            VALUES (
                ${userId},
                ${product},
                ${brand},
                ${price},
                ${colourId},
                ${sizeId},
                ${categoryId},
                ${genderId},
                ${description}
            )
            RETURNING *
        `
        // console.log(productMeta);
        return productMeta;
    }catch(error){
        console.error(error.message);
        return error;
    }
}

export async function deleteProductById(id: number){
    
    try{
        const result = await sql`
            DELETE FROM products
            WHERE id = ${id}
        `
        console.log(result)
        return result;
    }catch(error){
        return error;
    }

}


