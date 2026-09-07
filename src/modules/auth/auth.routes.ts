import { Router } from "express";
import { getAllAdmins, getAdminById, registerAdmin, loginAdmin} from "./auth.controller.ts";

const route = Router();
// route.get("/", getAllAdmins);
// route.get('/:id', getAdminById);
route.post("/register", registerAdmin);
route.post("/login", loginAdmin);

export default route;