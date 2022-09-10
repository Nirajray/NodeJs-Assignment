const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

//Defining Schema for user==/
const userUploadSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required:'id is required',
    },
    image:{
        type:String,
        required:true
    }

    }, { timestamps: true })

module.exports= mongoose.model("UserUpload", userUploadSchema)