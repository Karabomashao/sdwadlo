import {type Request, type Response} from "express";
import { createAdmin } from "../auth/auth.service.ts";

async function registerAdmin(req:Request, res:Response){

    try{
        const {username, password, firstname, lastname} = req.body;
        const adminUser = await createAdmin(username, password, firstname, lastname);
        res.status(200).json({
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
    const admin_cred = req.body;
    res.send("You have successfully logged in");
}


export {
    getAdminById,
    getAllAdmins,
    registerAdmin,
    loginAdmin
}