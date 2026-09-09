import { Router } from "express";
import { registerAdmin, loginAdmin} from "./auth.controller.ts";
import { validateToken} from "../../middleware/auth.middleware.ts";

const route = Router();
route.post("/register",  registerAdmin);
route.post("/login", loginAdmin);

export default route;