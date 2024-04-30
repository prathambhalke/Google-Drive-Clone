const { default: mongoose } = require("mongoose");

const filesUploadDataSchema = mongoose.Schema(
        {
            fileData : String,
            origFileName : String,
        },
        {
            collection: "fileDetails",
        }
);

mongoose.model("fileDetails", filesUploadDataSchema)