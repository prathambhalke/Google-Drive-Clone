const { default: mongoose } = require("mongoose");

const filesUploadDataSchema = mongoose.Schema(
        {
            fileData : String
        },
        {
            collection: "fileDetails",
        }
);

mongoose.model("fileDetails", filesUploadDataSchema)