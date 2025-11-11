import express from "express"
import dotenv from "dotenv"
import {userRouter} from "./routers/userRouter.js"
import "./database/conn.js"

dotenv.config({ path: "./config.env" })

const app = express()

let port = process.env.PORT || 5012

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "content/page not found!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});