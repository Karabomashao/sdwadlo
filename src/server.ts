import express, {type Request, type Response} from "express";

const app = express();
const PORT = 3000;


app.get("/", (req, res) =>{
    res.send("This is the home page or whatever it is that I want to do")
})

app.get("/admin", (req, res) => {
    res.send("You have reached the Admin portal")
})

app.listen(PORT, () => {
    console.log(`Server is runnin on http://localhost:${PORT}`);
});




