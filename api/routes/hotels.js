// import express from "express";
// import Hotel from "../models/Hotel"
//
// const router = express.Router();
//
// router.post("/", async (req,res)=>{
//
//     const newHotel = new Hotel(req.body)
//
//     try {
//         const sevedHotel = await newHotel
//         res.status(200).json(sevedHotel)
//     }catch (err){
//         res.status(500).json(err)
//     }
// })
//
// export default router


import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res, next) => {

   console.log("Hi I'm a hotel route")
    next()

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
