const { default: mongoose } = require("mongoose");
const { uploadToCloudinary } = require("../Services/cloudinary");
const cloudinary = require("../Services/cloudinary");
require("../Models/filesUploadData");

const file = mongoose.model("fileDetails");
const BinFiles = mongoose.model("binFiles");
const StarredFiles = mongoose.model("starredFiles");

async function handleFileUpload(req, res) {
  const fileUrl = req.body.imageBase64;
  const origFileName = req.body.origFileName;

  try {
    // Check if the file already exists in the database
    const existingFile = await file.findOne({ origFileName: origFileName });
    if (existingFile) {
      return res.json({
        status: "exists",
        message: "File already exists",
        file: existingFile,
        isExist: true,
      });
    }

    cloudinary.uploader.upload(fileUrl, async function (err, result) {
      if (err) {
        console.error("Cloudinary Upload Error:", err);
        return res.status(500).json({
          success: false,
          message: "Error uploading to Cloudinary",
          error: err.message,
        });
      }

      let newFile = await file.create({
        fileData: result.url,
        origFileName: origFileName,
      });
      await newFile.save();

      return res.json({ status: "OK🟩", file: newFile });
    });
  } catch (err) {
    console.error("Error handling file upload:", err);
    res.status(500).json({ status: "error🔴", error: err.message });
  }
}

async function getFileData(req, res) {
  try {
    const data = await file.find({});
    res.send({ status: "OK🟩", data: data });
  } catch (error) {
    res.send({ status: "Error🔴", error: error.message });
  }
}

async function handleBinUpload(req, res) {
  const { fileData, origFileName } = req.body;

  try {
    let newBinFile = await BinFiles.create({
      fileData: fileData,
      origFileName: origFileName,
    });
    await newBinFile.save();
    await file.deleteOne({ fileData: fileData });

    return res.json({ status: "OK✅ for handling Bin" });
  } catch (err) {
    res.json({ status: "error🔴 for handling Bin", error: err.message });
  }
}

async function handleRestoreFile(req, res) {
  try {
    const { selectedFileIds } = req.body.data;
    const data = await BinFiles.find({ _id: selectedFileIds });
    const { fileData, origFileName } = data[0];
    let newFile = await file.create({
      fileData: fileData,
      origFileName: origFileName,
    });
    await newFile.save();
    await BinFiles.deleteMany({ _id: { $in: selectedFileIds } });
    return res.json({ status: "OK🟩", file: newFile });
  } catch (error) {
    console.error("Error while restoring file:", err);
    res.status(500).json({ status: "error🔴", error: err.message });
  }
}

async function getBinFileData(req, res) {
  try {
    const data = await BinFiles.find({});
    res.send({ status: "OK🟩", data: data });
  } catch (error) {
    res.send({ status: "Error🔴", error: error.message });
  }
}

async function handleStarredUpload(req, res) {
  const { fileData, origFileName } = req.body;

  try {
    let newStarredFile = await StarredFiles.create({
      fileData: fileData,
      origFileName: origFileName,
    });
    await newStarredFile.save();
    return res.json({ status: "OK✅ for handling Bin" });
  } catch (err) {
    res.json({ status: "error🔴 for handling Bin", error: err.message });
  }
}

async function getStarredFileData(req, res) {
  try {
    const data = await StarredFiles.find({});
    res.send({ status: "OK🟩", data: data });
  } catch (error) {
    res.send({ status: "Error🔴", error: error.message });
  }
}

async function deleteAllBinFiles(req, res) {
  try {
    await BinFiles.deleteMany({});
    return res.json({ status: "OK✅ All bin files deleted" });
  } catch (error) {
    return res.json({ status: "Error🔴", error: error.message });
  }
}

async function deleteSelectedBinFiles(req, res) {
  const { selectedFileIds } = req.body;

  try {
    await BinFiles.deleteMany({ _id: { $in: selectedFileIds } });
    return res.json({ status: "OK✅ Selected bin files deleted" });
  } catch (error) {
    return res.json({ status: "Error🔴", error: error.message });
  }
}

async function removeStarredFiles(req, res) {
  const { selectedFileIds } = req.body;

  try {
    await StarredFiles.deleteMany({ _id: { $in: selectedFileIds } });
    return res.json({ status: "OK✅ Selected bin files deleted" });
  } catch (error) {
    return res.json({ status: "Error🔴", error: error.message });
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
  deleteSelectedBinFiles,
  removeStarredFiles,
  handleRestoreFile,
};
