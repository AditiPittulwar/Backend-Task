import express from "express"
import { UserRegister } from "../controllers/usercontroller.js"

const userRouter = express.Router()

userRouter.get("/test", (request, response) => { 
    response.status(200).json({ message: "you reached test route !" }) 
})

userRouter.post("/user-register", UserRegister)

export { userRouter }