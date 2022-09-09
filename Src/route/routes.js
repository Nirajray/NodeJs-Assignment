const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const mid = require("../Middleware/Auth")


router.post("/users", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/imageUpload", userController.uploadImage);

module.exports=router;