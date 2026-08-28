import app from "./app.js";
import { env } from "./config/environment.js"
import adminRouter from "./modules/auth/auth.routes.js"
import productRouter from "./modules/products/products.routes.js"


app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);


app.listen(env.PORT, () => {
    console.log(`Server is runnin on http://localhost:${env.PORT}`);
});




