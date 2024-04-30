const { default: mongoose } = require("mongoose");

require("../Models/filesUploadData");
const file = mongoose.model("fileDetails")
async function handleFileUpload(req, res) {
    const fileD = req.file.filename;
    const oriFileName = req.file.originalname;
    try {
         let newFile = await file.create({fileData: fileD,origFileName : oriFileName});
        newFile.save();
       return res.json({status: "OK🟩"});
    } catch (err) {
        res.json({status: "error🔴", error: err});
    }
}

async function getFileData(req,res){
    try {
        file.find({}).then(data => {
            res.send({status : "OK🟩", data : data})
        })
    } catch (error) {
        res.send({status : "Error🔴"})
    }
}
module.exports = { handleFileUpload,getFileData };
