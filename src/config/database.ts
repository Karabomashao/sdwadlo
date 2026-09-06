//Pool manages Postgre connections for your application instead of creating a brand new database connection for every request.

import postgres from "postgres";
import { Pool } from "pg";
import { env } from "../config/environment.js";


const connectionString = process.env.DB_CONNECTION_STRING;
const sql = await postgres(connectionString);

export async function connectDB(){
    try{
        await sql`SELECT 1`;
        console.log("Database connection successful");
    } catch(error){
        console.error("Database connection failed:", error);
        throw error;
    }
}


// const pool = new Pool({
//     connectionString : process.env.DB_CONNECTION_STRING
// })

// export async function connectDB(){
//     try{
//         const result = await pool.query("SELECT NOW()");
//         console.log("Database has connected successfully.");
//         console.log("Database time:", result.rows[0].now);
//     } catch (error){
//         console.error("Database connection failed:", error);
//         throw error;
//     }
// }




export default sql;

