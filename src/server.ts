import app from "./app.js";
import { env } from "./config/environment.js";
import adminRouter from "./modules/auth/auth.routes.js";
import productRouter from "./modules/products/products.routes.js";
import { connectDB } from "./config/database.ts";


app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);



//ConnectDB
await connectDB();



//Start Server
app.listen(env.PORT, () => {
    console.log(`Server is runnin on http://localhost:${env.PORT}`);
});




