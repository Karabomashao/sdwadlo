import sql from "../../config/database.ts";

export async function addProduct(productDetails: object){
    const {product, brand, price, colourId, sizeId, categoryId, genderId, userId, description} = productDetails;
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
    console.log(productMeta);
    return productMeta;
}

export async function updateProduct(productDetails: object, adminId: int){
    // const updatedProduct = await sql`

    // `
}
