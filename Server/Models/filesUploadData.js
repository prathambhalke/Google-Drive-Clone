const { default: mongoose } = require("mongoose");

const filesUploadDataSchema = mongoose.Schema(
        {
            fileData : Object
        },
        {
            collection: "fileDetails",
        }
);

mongoose.model("fileDetails", filesUploadDataSchema)