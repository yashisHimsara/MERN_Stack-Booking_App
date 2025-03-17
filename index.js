// import express from "express";
// import dotenv from "dotenv"
// import mongoose from "mongoose";
// import usersRoute from "./api/routes/users.js";
// import roomsRoute from "./api/routes/rooms.js";
// import hotelsRoute from "./api/routes/hotels.js";
// import authRoute from "./api/routes/auth.js";
//
// const app = express()
// dotenv.config()
//
// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO);
//         console.log("Connected to mongoDB");
//     }catch (error){
//         throw error;
//     }
// };
//
// mongoose.connection.on("Disconnect", ()=>{
//     console.log("mongoDB disconnected!");
// })
// mongoose.connection.on("connect", ()=>{
//     console.log("mongoDB connected!");
// })
//
// // app.get("/", (req,res) =>{
// //     res.send("Hello first req")
// // })
//
// app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);
//
//
// app.listen(8800, () => {
//     connect()
//     console.log("Connected to backend.");
//   });


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./api/routes/users.js";
import roomsRoute from "./api/routes/rooms.js";
import hotelsRoute from "./api/routes/hotels.js";
import authRoute from "./api/routes/auth.js";

// Load environment variables
dotenv.config();

const app = express();

// MongoDB Connection Function
const connect = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI is not defined in .env file");
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

// MongoDB Connection Listeners
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((req,res,next)=>{
    console.log("Hi I'm a Middleware!")
})

// Start Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
});
