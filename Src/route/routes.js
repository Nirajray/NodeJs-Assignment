const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const imageUpload =require("../Controller/ImageUpload")
const mid = require("../Middleware/Auth")

// For register User==//
router.post("/users", userController.registerUser);
// For login User==//
router.post("/login", userController.loginUser);
// For uploading images==//
router.post("/imageUpload/:userId", mid.authentication, mid.authorization, imageUpload.uploadimage);

module.exports=router;