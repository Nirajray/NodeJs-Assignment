const userModel = require("../Model/userModel");
const mongoose = require("mongoose");


const registerUser = async function(req, res){
    const body = req.body;
    const{name, email, password} = body;
}
