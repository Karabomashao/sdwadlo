import { superbase } from "./supabase";


export async function getUserToken(){

    try{
        const {data:{session},} = await superbase.auth.getSession();
        const accessToken = session?.access_token;
        return accessToken;

    }catch(error){
        console.log(error);
    }
}
