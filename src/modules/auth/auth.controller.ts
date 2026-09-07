import {type Request, type Response} from "express";
import { createAdmin } from "../auth/auth.service.ts";

async function registerAdmin(req:Request, res:Response){
    const {username, password} = req.body;
    createAdmin(username, password);
    res.send("Admin has successfully created a profile");
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