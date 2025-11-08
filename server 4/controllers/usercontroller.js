import { userModel } from "../models/userSchema.js"
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({path: "./config.env"});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

let genrateOTP = () => {
    return Math.floor((Math.random() * 9000) + 1000)
}

let sendEmail = async (email) => {
    try {

        let otp = genrateOTP()

        let result = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "test otp email !",
            html: `
                <h1>your otp is <span style="color:red;">${otp}</span> </h1>
                <p>this otp is valid for 5 mins.</p>
            `
        })

          console.log(result)

        console.log("an email has been sent !")

        
    } catch (err) {
        console.log("unable to send email: ", err)
        throw err
    }
}



let UserRegister = async (req, res) => {
    try {

        let { name, phone, email, address, password } = req.body

        if (!name || !phone || !email || !address || !password) throw ("invalid data !")

        let userExist = await userModel.findOne(
            { $or: [{ "email.userEmail": email }, { "phone": phone }] }
        )

        if (userExist) throw ("duplicate email/ phone !")

        let emailObject = {
            userEmail: email, verified: false
        }
        await sendEmail(email)

        let newUser = new userModel({ name, phone, email: emailObject, address, password })

        await newUser.save()

        console.log("user registred successfully !")

        response.status(202).json({ message: "user registered successfully !" })

    } catch (err) {
        response.status(400).json({ message: "unable to register user !", err })
    }
}

export { UserRegister }