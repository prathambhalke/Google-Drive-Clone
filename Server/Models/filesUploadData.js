const { default: mongoose } = require("mongoose");

const filesUploadDataSchema = mongoose.Schema(
  {
    fileData: String,
    origFileName: String,
  },
  {
    collection: "fileDetails",
  }
);


const addToBinDataSchema = mongoose.Schema(
  {
    fileData: String,
    origFileName: String,
  },
  {
    collection: "binFiles",
  }
);
mongoose.model("fileDetails", filesUploadDataSchema);

mongoose.model("binFiles", addToBinDataSchema);
