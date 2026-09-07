import { getAllAdmins, createAdminRow, getAdminUserByUsername } from "./auth.repository.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function validateLogin(username: string, password: string){
    
    try{
        const existingAdminUser = await getAdminUserByUsername(username)
        if (existingAdminUser.length != 0){
            const passwordMatch = await bcrypt.compare(password, existingAdminUser[0].password);
            if (passwordMatch){
                return existingAdminUser[0]
            } else{
                return null;
            }
        }else{
            console.log("Admin user was not found")
            return null;
        }

    } catch(error){
        console.error(error);
        throw new Error("Failed to fetch!");
    }

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