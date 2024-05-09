const { default: mongoose } = require("mongoose");

require("../Models/filesUploadData");
const file = mongoose.model("fileDetails");
const BinFiles = mongoose.model("binFiles");

async function handleFileUpload(req, res) {
  const fileD = req.file.filename;
  const oriFileName = req.file.originalname;
  try {
    let newFile = await file.create({
      fileData: fileD,
      origFileName: oriFileName,
    });
    newFile.save();
    return res.json({ status: "OK🟩" });
  } catch (err) {
    res.json({ status: "error🔴", error: err });
  }
}

async function getFileData(req, res) {
  try {
    file.find({}).then((data) => {
      res.send({ status: "OK🟩", data: data });
    });
  } catch (error) {
    res.send({ status: "Error🔴" });
  }
}

async function handleBinUpload(req, res) {
  const BinFilesData = req.body.fileData;
  const oriBinFileName = req.body.origFileName;

  try {
    let newBinFile = await BinFiles.create({
      fileData: BinFilesData,
      origFileName: oriBinFileName,
    });
    
    newBinFile.save();
    console.log("found the Bin data🔍🔍🔍🔍", newBinFile );

    // Deleting the bin file entry from the 'file' collection
    await file.deleteOne({ fileData: BinFilesData });

    return res.json({ status: "OK✅ for handling Bin" });
  } catch (err) {
    res.json({ status: "error🔴 for handling Bin", error: err });
  }
}

async function getBinFileData(req, res) {
  try {
    BinFiles.find({}).then((data) => {
      res.send({ status: "OK🟩", data: data });
    });
  } catch (error) {
    res.send({ status: "Error🔴" });
  }
}
module.exports = {
  handleFileUpload,
  getFileData,
  handleBinUpload,
  getBinFileData,
};
