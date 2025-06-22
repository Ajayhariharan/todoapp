const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User with that username already exists." });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedpassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during registration.", error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }
        
        const existingUser = await User.findOne({ username });
        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

     
        const token = jwt.sign(
            { userId: existingUser._id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, username: existingUser.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login.", error: error.message });
    }
};


