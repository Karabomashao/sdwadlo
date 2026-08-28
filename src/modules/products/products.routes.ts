// import { Request, Response } from "express";
import { getProducts, getProductById, addProduct } from "./products.contoller.js"; 
import { Router } from "express";

const route = Router();

route.get("/", getProducts);
route.get("/:id", getProductById);
route.post("/addProduct", addProduct)


export default route;