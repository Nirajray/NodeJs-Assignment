const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:'Name is required',
        trim:true
    },

    email: {
        type: String,
        unique: true,
        lowercase:true,
        required:'Email address is required',
        validate:{
            validator: function (email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
             message: 'Please enter a valid email', 
      }
    },
      password: {
        type: String,
        trim:true,
        required: 'Password is required'
      }
    }, { timestamps: true })

module.exports= mongoose.model("User", userSchema)