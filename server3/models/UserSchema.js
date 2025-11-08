import mongoose from "mongoose";

let addressObject = {
    street: "", city: "", state: "", country: "", pincode: ""
}

let userSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    address: {
        type: Object,
        default: addressObject
    },
    timeStamp: {
        type: String,
     
    }
   
})

userSchema.pre("save", function () {
    this.timeStamp = Date.now()
})

let UserModel = new mongoose.model("users", userSchema)

export { UserModel }
