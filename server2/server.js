import express from "express"
import { routes } from "./Router/route.js"
import dotenv from "dotenv"
import ejs from "ejs"

dotenv.config({path : "./config.env"})

const app = express()
const port = process.env.PORT;

app.set("views","./views");
app.set("view engine","ejs");

app.use(express.json())

app.use(routes);

app.use(express.static("public"))

app.listen(port , ()=> {
    console.log(`Server is running on ${port}`)
})
