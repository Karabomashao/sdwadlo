import sql from "../../config/database.ts";

export async function addProduct(productDetails: object, adminId: int){
    const {name, brand, price, colour, size, category} = productDetails;
    console.log(adminId, productDetails);
    const product = await sql`
        INSERT INTO products (name, brand, price, colour, size, category, admin_id)
        VALUES (${name}, ${brand}, ${price}, ${colour}, ${size}, ${category}, ${adminId})
        RETURNING *
    `
    console.log(product);
    return product;
}
