const aws = require("aws-sdk")
const obj=require("../Passedvalue")


// 
aws.config.update(obj.obj)

let uploadFile = async(file) => {
    return new Promise(function(resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

        var uploadParams = {
            ACL: "public-read",//readable publically acess
            Bucket: "classroom-training-bucket", //HERE folder as a bucket
            Key: "NodejsAssignment/" + file.originalname, //HERE  
            Body: file.buffer//
        }


        s3.upload(uploadParams, function(err, body) {
            if (err) {
                console.log(err)
                return reject({ "error": err })
            }
            console.log(body)
            console.log("file uploaded succesfully")
            return resolve(body.Location)
        })

    })
}


module.exports.uploadFile=uploadFile