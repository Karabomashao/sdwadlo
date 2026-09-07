import sql from "../../config/database.ts";

export async function getAllAdmins(){
    
    const admins = sql`
        SELECT * FROM "Admin"
    `
    return admins;
}

export async function createAdminRow(username: string, password: string, firstname: string, lastname: string){

    try{
        const adminUser = await sql`
            INSERT INTO "Admin" (username, password, first_name, last_name)
            VALUES (${username}, ${password}, ${firstname}, ${lastname})
            RETURNING *
        `

        const newAdminUser = adminUser.map(
            ({password, is_active, created_at, ...filteredNewAdminUser} = adminUser) => {
            return filteredNewAdminUser
        })

        console.log(newAdminUser);
        return newAdminUser;

    } catch (error){
        console.error("Failed to create user in repository:", error);
        throw error;
    }
}
