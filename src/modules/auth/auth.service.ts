import { getAllAdmins, createAdminRow, addColumn } from "./auth.repository.ts";
import bcrypt from "bcrypt";


export async function validateAdmin(
    username: string, 
    password: string
    ) {
        const test = "Testing";
}


export async function createAdmin(
    username: string,
    password: string,
    firstname: string,
    lastname: string
    ) {

        const payload = {
            "username" : username,
            "password" : password,
            "firstname": firstname,
            "lastname" : lastname 
        }


        const admins = await getAllAdmins();

        const existingAdmin = admins.find((admin) => {
            return username === admin.username;
        })

        if (existingAdmin){
            console.error("User already exists");
            throw new Error("User already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        try{
            const newAdminUser = createAdminRow(username, hashPassword, firstname, lastname);
            return newAdminUser;
        } catch(error){
            console.error("Failed to create admin user in service: ", error);
            throw new Error("Failed to create admin user");
        }
}