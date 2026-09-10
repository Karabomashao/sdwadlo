import { getAllAdmins, createAdminRow, getAdminUserByUsername } from "./auth.repository.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminUserPayload } from "../../utils/payload.ts";
import { generateToken } from "../../utils/jwt.ts";


export async function validateLogin(username: string, password: string){
    
    try{
        const existingUser = await getAdminUserByUsername(username);
        if (existingUser.length != 0){
            const passwordMatch = await bcrypt.compare(password, existingUser[0].password);
            if (passwordMatch){

                const payload = adminUserPayload(existingUser[0])
                const token = await generateToken(payload);
                return {
                    "token": token,
                    "userId": existingUser[0].id,
                    "username": existingUser[0].username
                };
            } else{
                console.log("Invalid credentials");
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