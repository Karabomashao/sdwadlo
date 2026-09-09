// import { Request, Response } from "express";
import { getProducts, getProductById, addProduct } from "./products.contoller.js"; 
import { Router } from "express";
import { validateToken } from "../../middleware/auth.middleware.ts";

const route = Router();

route.get("/", getProducts);
route.get("/:id", getProductById);
route.post("/admin/addProduct", validateToken, addProduct);


export default route;