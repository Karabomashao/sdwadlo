import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/environment.ts";

export function validateToken(req: Request, res: Response, next: NextFunction){
    
    const headers = req.headers;
    try{    
        const authorization = headers.authorization;
        const token = authorization.split(" ")[1]
        
        if (token){
            const decoded = jwt.verify(token, env.JWT_SECRET);
            req.user = decoded
            next();
        }

    }catch(error){
        console.error(error.message);
        res.status(403).json({
            message: "Unauthorized Access"
        });
    }
}