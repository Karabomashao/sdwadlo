import { getAllAdmins, createAdminRow, addColumn } from "./auth.repository.ts";


export async function validateAdmin(
    username: string, 
    password: string
    ) {
        const test = "Testing";
}



export async function createAdmin(
    username: string,
    password: string
    ){

        addColumn("last_name");
            
        const admins = await getAllAdmins();
        const existingAdmin = admins.find((admin) => {
            return username === admin.username;
        })
        
        if (existingAdmin){
            console.log("User already exists.")
        } else{
            createAdminRow(username, password);
        }
}