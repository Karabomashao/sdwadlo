import dotenv from "dotenv";

const results = dotenv.config();


export const env = {
    PORT: Number(process.env.PORT) || 3000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET
}