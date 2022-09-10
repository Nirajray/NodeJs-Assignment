const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const imageUpload =require("../Controller/ImageUpload")
const mid = require("../Middleware/Auth")


router.post("/users", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/imageUpload/:id", mid.authentication, mid.authorization, imageUpload.uploadimage);

module.exports=router;