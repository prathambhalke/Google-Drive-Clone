const express = require("express");
const { handleUserSignUp, handleUserLogin, getUsers } = require("../Controllers/user");
const router = express.Router();

router.get("/getUsers", getUsers)
router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);


module.exports = router;
