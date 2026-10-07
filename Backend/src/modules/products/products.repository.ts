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

export async function addProductColour(colourRows){
    try{
        console.log(colourRows);
        const colourMeta = await sql`
            INSERT INTO product_colours
            ${sql(colourRows, "product_id", "colour_id")}
        `

        console.log(colourMeta);
    }catch(error){
        return error
    }
}

export async function addProductSize(sizeRows){
    try{
        const colourMeta = await sql`
            INSERT INTO product_sizes
            ${sql(sizeRows, "product_id", "size_id")}
        `
    }catch(error){
        return error
    }
}

export async function addProduct(productDetails: object, userId: string){
    const {productName, brand, price, category, description, colours, sizes} = productDetails;

    try{
        const productMeta = await sql`
            INSERT INTO products (
                admin_id,
                product, 
                brand, 
                price,
                category_id,
                description
            )
            VALUES (
                ${userId},
                ${productName},
                ${brand},
                ${price},
                ${category},
                ${description}
            )
            RETURNING *
        `
        const productId = productMeta[0].id
        
        const colourRows = colours.map((colourId) => ({
            product_id: productId,
            colour_id: colourId
        }))

        return productMeta;

        // const colourMeta = await sql`
        //     INSERT INTO product_colours
        //     ${sql(colourRows, "product_id", "colour_id")}
        // `;

        const sizeRows = sizes.map((sizeId) => ({
            size_id: sizeId,
            product_id: productId
        }))

        // const sizeMeta = await sql`
        //     INSERT INTO product_sizes
        //     ${sql(sizeRows, "size_id", "product_id")}
        // `;


    }catch(error){
        console.error(error.message);
        return error;
    }
}

export async function addFilePath(path: string, productId: string){
    try{
        const images = await sql`
        INSERT INTO images(
            product_id,
            filepath
        )
        VALUES(
            ${productId},
            ${path}
        )
        RETURNING *
    `

    console.log("File was successfuly uploaded!");
    }catch(error){
        console.log(error);
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


