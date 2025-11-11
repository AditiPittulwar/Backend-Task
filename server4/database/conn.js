import mongoose from "mongoose";
import dotenv from "dotenv";
console.log("🧩 conn.js loaded!");


dotenv.config({path: "./config.env"});

async function conn() {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to MongoDB successfully");

    }catch(err){
        console.log("Unable to connect to MongoDB:", err);
    }
    
}

conn();