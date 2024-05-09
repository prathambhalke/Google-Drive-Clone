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

const addToStarredDataSchema = mongoose.Schema(
  {
    fileData: String,
    origFileName: String,
  },
  {
    collection: "starredFiles",
  }
);

mongoose.model("fileDetails", filesUploadDataSchema);

mongoose.model("binFiles", addToBinDataSchema);

mongoose.model("starredFiles", addToStarredDataSchema);