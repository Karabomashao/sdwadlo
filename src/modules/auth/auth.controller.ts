import {type Request, type Response} from "express";
import { createAdmin, validateLogin } from "../auth/auth.service.ts";
import { generateToken } from "../../utils/jwt.ts";

async function registerAdmin(req:Request, res:Response){

    try{
        const {username, password, firstname, lastname} = req.body;
        const adminUser = await createAdmin(username, password, firstname, lastname);
        res.status(201).json({
            adminUser
        });       
    } catch(error){
        if (error instanceof Error && error.message === "User already exists"){
            return res.status(409).json({
                    message: error.message    
            });
        }else{
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

async function loginAdmin(req:Request, res:Response){

    const {username, password} = req.body;

    try{
        const authenticatedUser = await validateLogin(username, password);
        if (authenticatedUser){
            res.status(200).json({
            message: "You have successfully logged in.",
            authenticatedUser
        });
        }else{
            res.status(403).json({
                message: "Invalid credentials"
            })
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}


export {
    getAdminById,
    getAllAdmins,
    registerAdmin,
    loginAdmin
}