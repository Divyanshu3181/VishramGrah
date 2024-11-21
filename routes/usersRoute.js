const express = require ("express");
const router = express.Router();
const User = require("../models/user");


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send({ message: "User registered successfully!" });
    } catch (error) {
        return res.status(400).json({ message: "Registration failed", error });
    }
});


router.post("/login", async(req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email, password : password});
        if (user ) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user.id,
            };
            res.send(temp);
        } else {
            return res.status(400).json({message: 'Login Failed'});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
});


module.exports = router;