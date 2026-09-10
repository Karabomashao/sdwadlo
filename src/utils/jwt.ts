import jwt from "jsonwebtoken";
import { env } from "../config/environment.ts";

export async function generateToken(payload: object): string{
    const token = jwt.sign(payload, env.JWT_SECRET, {expiresIn: "5h"});
    return token;
}

