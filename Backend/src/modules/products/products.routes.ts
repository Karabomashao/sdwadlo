// import { Request, Response } from "express";
import { getProducts, updateProductById, addProduct, deleteProduct, getAllProducts } from "./products.contoller.js"; 
import { Router } from "express";
import { validateToken } from "../../middleware/auth.middleware.ts";

const route = Router();

route.get("/", getProducts);
route.patch("/admin/updateProductById/:id", validateToken, updateProductById);
route.post("/addProduct", validateToken, addProduct);
route.delete("/admin/deleteById/:id", validateToken, deleteProduct)
route.get("/admin/allProducts/", getAllProducts);


export default route;

//http://localhost:3000/api/product/admin/deleteById/4
//http://localhost:3000/api/product/admin/deletetById/3