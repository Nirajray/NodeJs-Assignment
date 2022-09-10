const express = require("express");
const mongoose = require("mongoose")
 const multer =require("multer")
const route = require("./route/routes");
const mongoDb= require("../Src/credentials")
// const fileUpload = require("express-fileupload")
const app = express();

app.use(express.json());
// app.use(fileUpload({
//     limits:{fileSize: 100 * 1024 },
// }))
app.use( multer().any())

mongoose.connect(mongoDb.mongoDbUri, {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});