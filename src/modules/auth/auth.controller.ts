import {type Request, type Response} from "express";

function getAllAdmins(req : Request, res: Response){
    res.send("Testing getAllAdmins controller - returning all items"); 
}

function getAdminById(req:Request, res:Response){
    res.send("Testting getAdminById controller - return admin by id");
}

async function registerAdmin(req:Request, res:Response){
    const admin_details = req.body;
    console.log(admin_details);
    res.send("Admin has successfully created a profile");
}

async function loginAdmin(req:Request, res:Response){
    const admin_cred = req.body;
    console.log(admin_cred);
    res.send("You have successfully logged in");
}


export {
    getAdminById,
    getAllAdmins,
    registerAdmin,
    loginAdmin
}