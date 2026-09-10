import sql from "../../config/database.ts";

export async function getAllAdmins(){
    const admins = sql`
        SELECT * FROM admin_users
    `
    return admins;
}

export async function getAdminUserByUsername(username: string){
    try{
        const adminUser = await sql`
            SELECT * FROM users
            WHERE "username" = ${username}
        `
        console.log(adminUser);
        return adminUser;

    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function getUserById(id: Number){
    try{
        const adminUser = await sql`
            SELECT * FROM users
            WHERE "id" = ${id}
        `
        // console.log(adminUser);
        return adminUser;

    } catch(error){
        console.error(error);
        throw error;
    }
}

export async function createAdminRow(username: string, password: string, firstname: string, lastname: string){
    try{
        const adminUser = await sql`
            INSERT INTO users (username, password, first_name, last_name)
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
