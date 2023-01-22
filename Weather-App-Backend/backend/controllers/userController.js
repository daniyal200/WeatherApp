const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Weather = require('../models/weatherModel');

const asyncHandler = require('express-async-handler')
const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body
    if (!name || !username || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ username })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        username,
        password: hashedPassword,
    })

    const registeredUser = await User.findOne({username: username});

    if (registeredUser) {
        console.log("USER >>>> ", registeredUser);
        const defaultCities = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"];
        const weathers = await Weather.find({ city: { $in: defaultCities } });

        console.log("Weather >>>>> ", weathers);

        if (weathers.length > 0) {
            const userObject = {
                cities: weathers
            }
              await User.updateOne({ username: username }, userObject);
        }
    } else {
        res.json({msg: "Registration Failed"});
    }

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUser =async(req,res) =>{
    console.log("BODY >>> ", req.body);
    const userdata = await User.findOne({username:req.body.username})
    if(userdata)
    {
        res.json(userdata)
    } else{
        res.status(400)
        .json({message:'NO DATA REC.'})
    }

}

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    // Check for user username
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        req.session.save((err) => {
            if (err) throw err;

            req.user = user;
            console.log("SESSION >>> ", req.user);
            res.json({
                user: user
            })
        });
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


module.exports = { registerUser, loginUser ,getUser};

