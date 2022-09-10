const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'Number' && value.toString().trim().length === 0) return false
    return true
}


const registerUser = async function (req, res) {
    try {

        const body = req.body;

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, message: "Body can not be empty" })
        }

        const { name, email, password } = body;


        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please enter valid name" })
        }

       
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter valid email" })

        }

        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(body.email))) {
            return res.status(400).send({ status: false, message: ' Email should be a valid' })
        }

        // Email is Unique...
        let duplicateEmail = await userModel.findOne({ email: body.email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: 'Email already exist' })
        };


        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter valid password" })

        }

        let Passwordregex = /^[A-Z0-9a-z]{1}[A-Za-z0-9.@#$&]{7,14}$/
        if (!Passwordregex.test(password)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid password, minlength 8, maxxlength 15" })
        }

        //generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        passwordValue = await bcrypt.hash(password, salt);
          
        let filterBody = {
            name:name,
            email:email,
            password:passwordValue
        }
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

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        //****------------------- Email validation -------------------****** //

        if (!isValid(body.email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        };

        // For a Valid Email...
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(body.email))) {
            return res.status(400).send({ status: false, message: ' Email should be a valid' })
        };


        //******------------------- password validation -------------------****** //

        if (!isValid(body.password)) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }

        //******------------------- checking User Detail -------------------****** //


        let checkUser = await userModel.findOne({ email: body.email });

        if (!checkUser) {
            return res.status(401).send({ Status: false, message: "email is not correct" });
        }

        let passwordMatch = await bcrypt.compare(body.password, checkUser.password)
        if (!passwordMatch) {
            return res.status(401).send({ status: false, msg: "incorect password" })
        }

        //-- generating token for user 
        let userToken = jwt.sign({

            userId: checkUser._id,
            batch: "Uranium"

        }, 'FunctionUp Group21', { expiresIn: '86400s' }); // token expiry for 24hrs

        return res.status(200).send({ status: true, message: "User login successfull", data: { userId: checkUser._id, token: userToken } });

    }

    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports = { registerUser, loginUser }

