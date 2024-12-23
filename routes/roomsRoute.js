const express = require ("express");
const router = express.Router();

const Room = require('../models/room');

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send({ rooms });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;

    try {
        const room = await Room.findOne({ _id: roomid });
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.send({ room });
    } catch (error) {
        console.error("Error fetching room by ID:", error);
        return res.status(400).json({ message: "Error fetching room" });
    }
});





module.exports = router;