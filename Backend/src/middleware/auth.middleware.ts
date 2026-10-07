import { Request, Response, NextFunction } from "express";
import { superbase } from "../config/supabase.js";


export async function validateToken(req: Request, res: Response, next: NextFunction){
    
    const headers = req.headers;
    try{    
        const authorization = headers.authorization;
        const token = authorization?.split(" ")[1]
        if (!token) {
            res.status(403).json({
                message: "Access token required!"
            });
            return;
        }

        const {data, error} = await superbase.auth.getUser(token);
        if (error || !data.user){
            res.status(403).json({
                message:"Access token required!"
            })
            return;
        }


        req.user = data.user;
        // console.log(data.user);
        next();



    }catch(error){
        console.error(error.message);
        res.status(403).json({
            message: "Unauthorized Access"
        });
    }
}