const userModel = require("../Model/userModel")
const aws = require("../Middleware/aws")

const uploadimage = async function (req, res) {
    try {

        let userId = req.params.id;

        if (!userId) {
            return res.status(400).send({ status: false, message: "userid required" })
        }

        let userExist = await userModel.findOne({ _id: userId })
        if (!userExist) {
            return res.status(404).send({ status: false, message: "Invalid user" })

        }
        let files = req.files;
        let limitSize = 512000;
        console.log(files)
        if (req.files.length === 0) {
            return res.status(400).send({ status: false, message: "Provide image to upload" })
        }

        if (files[0].size > limitSize) {
            return res.status(400).send({ status: false, message: "Image is too large" })

        }

        if (files[0].mimetype == 'image/png' || files[0].mimetype == 'image/jpeg') {


            //upload filse in aws s3
            var uploadImage = await aws.uploadFile(files[0]);
            let uploadData = uploadImage
            return res.status(200).send({ status: true, message: "Upload image successfully", data: uploadData })
        }
        else {
            return res.status(400).send({ status: false, message: "image should be in jpeg or jpg and png" })

        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}



module.exports.uploadimage = uploadimage