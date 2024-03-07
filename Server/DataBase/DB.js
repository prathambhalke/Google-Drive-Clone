const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully 🙌!"))
  .catch((err) => console.log(err, "failed to connect ☹️"));
