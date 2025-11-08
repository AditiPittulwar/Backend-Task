
import express from "express"
import { routes } from "./Router/route.js"
import dotenv from "dotenv"
import ejs from "ejs";

dotenv.config({ path : "./config.env" ,override:true});

const app = express();
let port = process.env.PORT;

 app.use(express.urlencoded({extended:true}))
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json())

app.use(express.static("public"))


app.use("/",routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
