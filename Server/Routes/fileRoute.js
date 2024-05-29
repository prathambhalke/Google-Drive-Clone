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
 filename: function(req, file, cb){
  cb(null, file.originalname)
 }
});

const upload = multer({ storage: storage });

router.get("/getFileData", getFileData);
router.post("/fileUpload", upload.single("fileData"), handleFileUpload);
router.get("/getBinFileData", getBinFileData);
router.post("/handleBinUpload", handleBinUpload);
router.get("/getStarredFileData", getStarredFileData);
router.post(  "/handleStarredUpload", handleStarredUpload);
router.delete("/deleteAllBinFiles", deleteAllBinFiles);
router.delete("/deleteSelectedBinFile", deleteSelectedBinFiles);
module.exports = router;
