import { response } from "express"
import { UserModel } from "../models/UserSchema.js"

const home = (req,res) => {
    res.status(200).json({ message: "welcome to our test route"})

}

const PostRegisterUser = async (req, res) => {
    try{

        let { name, phone, email, address } = req.body 
        
        if (!name || !phone || !email || !address) throw ("invalid/missing data !") 

        let userExist = await UserModel.findOne({ $or: [{ "email": email}, {"phone": phone}]})  
        
        if (userExist) throw ("duplicate phone/email address !")

        let newUser = new UserModel({name, phone, email, address})    

        let result = await newUser.save()

        console.log(result)

        console.log("user data saved into database !")

        res.status(202).json({ message: "user data saved successfully"})

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "unable to register user !",err})
    }
}

    const getAllUsers = async (req, res) => {
        try{

            let result = await UserModel.find({})

            if (result.length == 0) throw ("we dont have results to show !")

            res.status(200).json({ message: "got all user information !", result})

        } catch (err) {
            console.log("unable to find users :", err)
            res.status(400).json({ message: err}) 
        }
    }

    export { home, PostRegisterUser, getAllUsers }
