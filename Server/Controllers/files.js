const { default: mongoose } = require("mongoose");

require("../Models/filesUploadData");
const file = mongoose.model("fileDetails");
const BinFiles = mongoose.model("binFiles");
const StarredFiles = mongoose.model("starredFiles");


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

async function handleStarredUpload(req, res) {
  const StarredFilesData = req.body.fileData;
  const oriStarredFileName = req.body.origFileName;

  try {
    let newStarredFile = await StarredFiles.create({
      fileData: StarredFilesData,
      origFileName: oriStarredFileName,
    });
    newStarredFile.save();
    console.log("found the StarredFiles data🔍🔍🔍🔍", newStarredFile );
    return res.json({ status: "OK✅ for handling Bin" });
  } catch (err) {
    res.json({ status: "error🔴 for handling Bin", error: err });
  }
}

async function getStarredFileData(req, res) {
  try {
    StarredFiles.find({}).then((data) => {
      res.send({ status: "OK🟩", data: data });
    });
  } catch (error) {
    res.send({ status: "Error🔴" });
  }
}

async function deleteAllBinFiles(req, res) {
  try {
    await BinFiles.deleteMany({});
    return res.json({ status: "OK✅ All bin files deleted" });
  } catch (error) {
    return res.json({ status: "Error🔴", error: error });
  }
}

async function deleteSelectedBinFiles(req, res) {
  const selectedFileIds = req.body.selectedFileIds;
console.log(selectedFileIds)
  try {
    await BinFiles.deleteMany({ _id: { $in: selectedFileIds } });
    return res.json({ status: "OK✅ Selected bin files deleted" });
  } catch (error) {
    return res.json({ status: "Error🔴", error: error });
  }
}

module.exports = {
  handleFileUpload,
  getFileData,
  handleBinUpload,
  getBinFileData,
  handleStarredUpload,
  getStarredFileData,
  deleteAllBinFiles,
  deleteSelectedBinFiles
};
