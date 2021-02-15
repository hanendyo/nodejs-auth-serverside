const userModel = require('../models/userModel')
const bcrypt = require(`bcryptjs`)
const jwt = require('jsonwebtoken');

// Register
exports.userRegister = async (req, res, next)=> {
    try {
        const {email, password, passwordVerify} = req.body

        // validation
        if(!email || !password || !passwordVerify) {
            return res.status(400).json({errorMessage: `Please enter all required fields`})
        }
        if(password.length < 6) {
            return res.status(400).json({errorMessage: `Please enter a password of at least 6 characters`})
        }
        if(password !== passwordVerify) {
            return res.status(400).json({errorMessage: `Please enter the same password again`})
        }

        // validate existing use
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.status(400).json({errorMessage: `An account with this email already exist`})
        }

        // hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        // save a new user account to DB
        const newUSer = new userModel({
            email: email,
            passwordHash: hashedPassword
        });
        const savedUser = await newUSer.save();   

        // sign the token
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);
        console.log(`token:`,token);

        // send the token in a HTTP-only cookie
        res.cookie(`token`, token, {
            httpOnly: true,
        }).send()

    } catch (error) {
        console.error(error);
        res.status(500).send() 
    }
}


exports.userLogin= async (req, res, next) => {
    try {
        const {email, password} = req.body

        // validation
        if(!email || !password) {
            return res.status(400).json({errorMessage: `Please enter all required fields`})
        }

        // validate existing user
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(401).json({errorMessage: `Wrong email or password`})
        }

        // validate password
        const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);
        if(!correctPassword){
            return res.status(401).json({errorMessage: `Wrong email or password`})
        }
 
        // sign the token
        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);
        console.log(token);

        // send the token in a HTTP-only cookie
        res.cookie(`token`, token, {
            httpOnly: true,
        }).send()

    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

exports.userLogout = (req, res, next) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    }).send()
}