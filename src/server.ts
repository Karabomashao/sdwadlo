import express, {type Request, type Response} from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is runnin on http://localhost:${PORT}`);
});




