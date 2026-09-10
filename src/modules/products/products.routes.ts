// import { Request, Response } from "express";
import { getProducts, updateProductById, addProduct, deleteProduct } from "./products.contoller.js"; 
import { Router } from "express";
import { validateToken } from "../../middleware/auth.middleware.ts";

const route = Router();

route.get("/", getProducts);
route.patch("/admin/updateProductById/:id", validateToken, updateProductById);
route.post("/admin/addProduct", validateToken, addProduct);
route.delete("/admin/deleteById/:id", validateToken, deleteProduct)


export default route;

//http://localhost:3000/api/product/admin/deleteById/4
//http://localhost:3000/api/product/admin/deletetById/3