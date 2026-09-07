import sql from "../../config/database.ts";


export async function getAllAdmins(){
    
    const admins = sql`
        SELECT * FROM "Admin"
    `
    return admins;
}

export async function addColumn(columnName: string){
    const newColumn = await sql`
        ALTER TABLE IF EXISTS "Admin" 
        ADD ${sql(columnName)} VARCHAR(255) 
    `;
    console.log("Added a new column:", columnName);
}

export async function createAdminRow(username: string, password: string){

    try{
        const newAdmin = await sql`
            INSERT INTO "Admin" (username, password)
            VALUES (${username}, ${password})
            RETURNING *
        `
        console.log(newAdmin);
    } catch (error){
        console.error("Failed to create user:", error);
        throw error;
    }

}
