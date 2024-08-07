const express = require("express");
const {
  handleFileUpload,
  getFileData,
  getBinFileData,
  handleBinUpload,
  getStarredFileData,
  handleStarredUpload,
  deleteAllBinFiles,
  deleteSelectedBinFiles,
} = require("../Controllers/files");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Multer configuration for file upload
// const upload = multer({ dest: "uploads/" });

router.get("/getFileData", getFileData);
router.post("/fileUpload", upload.single("fileData"), handleFileUpload);
router.get("/getBinFileData", getBinFileData);
router.post("/handleBinUpload", upload.single("binFileData"), handleBinUpload);
router.get("/getStarredFileData", getStarredFileData);
router.post(
  "/handleStarredUpload",
  upload.single("binFileData"),
  handleStarredUpload
);
router.delete("/deleteAllBinFiles", deleteAllBinFiles);
router.delete("/deleteSelectedBinFile", deleteSelectedBinFiles);
module.exports = router;
