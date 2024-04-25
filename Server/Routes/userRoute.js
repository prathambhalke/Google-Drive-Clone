const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../Controllers/user");
const router = express.Router();
const multer = require("multer");

// Multer configuration for file upload
const upload = multer({ dest: "uploads/" });

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);

// File upload route
router.post("/upload", upload.single("fileupload"), async (req, res, next) => {
  try {
    // File upload logic here, if needed
    console.log("File uploaded:", req.file);
    res.status(200).send("File uploaded successfully");
  } catch (err) {
    // Pass error to the Express error handling middleware
    next(err);
  }
});

module.exports = router;
