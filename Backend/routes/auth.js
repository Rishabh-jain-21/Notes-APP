//authentication
const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'katrahi$hai'

// req - reuqest , res - response
//Route : 1 creating a user , when user want to sign-in/register /api/auth/createUser
router.post('/createUser', [body('email', 'Enter a valid email').isEmail(), body('name', 'Enter a valid name').isLength({ min: 3 }), body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),], async (req, res) => {
    //sending obj as json on screen
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //wrapping everything in try-catch to handle some uneven errors
    try {
        //checking whether same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ error: "Sorry!, a user with this email already exists" });
        }

        //Password hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // creting a user if it has unique email
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        //Generating token to get secured browsing (data)
        const data = {
            user: {
                id: user.id,
            }
        }
        //auth_data is token generated with jwt(jsonwebtoken); 
        const auth_data = jwt.sign(data, JWT_SECRET);
        res.json({ auth_data });

        // console.log(jwt_data);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry! Something went wrong , Please try again in sometime");
    }
})



//Route : 2 When a user want to login /api/auth/login
router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'Password can not be blank').exists()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // getting email password through destructuring
    const { email, password } = req.body;
    try {

        //checking mail already registered or not
        //user will have the data corresponding to that email 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Wrong credentials . Please , Check your credentials again" });
        }

        //Password checking
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Wrong credentials . Please , Check your credentials again" });
        }
        // if every-thing is correct we are going to send webtoken
        const data = {
            user: {
                id: user.id,
            }
        }
        //auth_data is token generated with jwt(jsonwebtoken); 
        const auth_data = jwt.sign(data, JWT_SECRET);
        res.json({ auth_data });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry! Something went wrong , Please try again in sometime");
    }
})

//Route 3 : get logged in user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        //getting user id from middleware/fetchuser
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Sorry! Something went wrong , Please try again in sometime");
    }
})
module.exports = router;