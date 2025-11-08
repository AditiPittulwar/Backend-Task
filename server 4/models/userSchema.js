import mongoose from "mongoose";
import bcrypt from "bcrypt"

let addressObject = {
    street: "", city: "", state: "", country: "", pincode: ""
}

let emailObject = {
    userEmail: "", verified: false
}

let userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: Object,
        require: true,
        default: emailObject
    },
    address: {
        type: Object,
        require: true,
        default: addressObject
    },
    password: {
        type: String,
        require: true,
    },
    timeStamp: {
        type: Date,
        default:Date.now
    }
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12)
    // this.timeStamp = Date.now()
})

let userModel = new mongoose.model("users", userSchema)

export { userModel }