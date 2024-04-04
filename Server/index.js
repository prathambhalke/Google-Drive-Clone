require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const PORT = process.env.PORT;
require("./DataBase/DB");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5002",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
