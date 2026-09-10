export function adminUserPayload(admin: object){

    const { password, first_name, last_name, is_active, ...adminPayload} = admin;
    return adminPayload;
}