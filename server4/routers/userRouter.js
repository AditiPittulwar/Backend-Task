import express from "express"
import {handleEmailOTP, handleLogin, handleUserRegistration, handlePasswordReset, verifyPasswordResetOTP, getUserInfo} from "../controllers/userController.js"
import { authUser } from "../middlewares/authUser.js"

const userRouter = express.Router()

userRouter.get("/test", (req, res) => {
  res.status(200).json({ message: "you reached test route !" })
})

userRouter.post("/user-register", handleUserRegistration)

userRouter.post("/verify-email-otp", handleEmailOTP)

userRouter.post("/reset-password-request", handlePasswordReset)

userRouter.post("/verify-password-reset-otp", verifyPasswordResetOTP)

userRouter.post("/login", handleLogin)

userRouter.get("/get-user-info", authUser, getUserInfo)

export { userRouter }
