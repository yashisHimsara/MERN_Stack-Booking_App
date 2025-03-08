import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import auth from "./api/routes/auth.js";

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    }catch (error){
        throw error;
    }
};

mongoose.connection.on("Disconnect", ()=>{
    console.log("mongoDB disconnected!");
})
mongoose.connection.on("connect", ()=>{
    console.log("mongoDB connected!");
})

// app.get("/", (req,res) =>{
//     res.send("Hello first req")
// })

app.use("/auth" , auth)

app.listen(8800, () => {
    connect()
    console.log("Connected to backend.");
  });