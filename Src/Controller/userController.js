// To perform crud operation==/
const userModel = require("../Model/userModel");

// For encrypting password
const bcrypt = require("bcrypt")

// Using to send token to the user==/
const jwt = require("jsonwebtoken");


// Using to validate request parameters by calling this function==//
const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'Number' && value.toString().trim().length === 0) return false
    return true
}


const registerUser = async function (req, res) {
    try {

        const body = req.body;

        // checking body is empty or not==//
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, message: "Body can not be empty" })
        }

        // Object Destructuring==//
        const { name, email, password } = body;

        var regex = /^[a-zA-Z ]*$/
        // validating name field==//
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please enter valid name" })
        }

        if (!regex.test(name)) {
            return res.status(400).send({ status: false, message: "Please enter valid name" })
        }

        // Validating email==//
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter valid email" })

        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: ' Email should be a valid' })
        }

        // Email is Unique or not ==//
        let duplicateEmail = await userModel.findOne({ email:email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: 'Email already exist' })
        };

        // Password is entered or not==//
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter valid password" })

        }

       
        if (!(password.trim().length >= 8 && password.trim().length <= 20)){
            return res.status(400).send({ Status: false, message: " Please enter a valid password length must in between 8 to 20" })
        }

        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        passwordValue = await bcrypt.hash(password, salt);

        // creating object to putiing valid value in each field==//
        let filterBody = {
            name: name,
            email: email,
            password: passwordValue
        }

        // Creating new user==//
        let createUser = await userModel.create(filterBody)
        return res.status(201).send({ status: true, message: "User created Successfully", data: createUser })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
}



const loginUser = async function (req, res) {
    try {

        let body = req.body

        //Checking body is 
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }
        // Object destructing==//
        const { email, password } = body

        //Email validation ==//
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        };

        // For Valid Email...
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: ' Email should be a valid' })
        };


        // password validation//
        if (!isValid(password)) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }

        //checking User Detail //
        let checkUser = await userModel.findOne({ email: email });

        //email is correct or not
        if (!checkUser) {
            return res.status(401).send({ Status: false, message: "email is not correct" });
        }

        let passwordMatch = await bcrypt.compare(password, checkUser.password)
        if (!passwordMatch) {
            return res.status(401).send({ status: false, msg: "incorect password" })
        }

        //-generating token for user 
        let userToken = jwt.sign({
            userId: checkUser._id,  // Payload of toekn
            batch: "Uranium"

        }, 'Somesecure@$65!**', { expiresIn: '86400s' }); // token expiry for 24hrs

        return res.status(200).send({ status: true, message: "User login successfull", data: { userId: checkUser._id, token: userToken } });

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { registerUser, loginUser }