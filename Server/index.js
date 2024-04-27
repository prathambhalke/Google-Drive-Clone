require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/userRoute");
const fileRoute = require("./Routes/fileRoute");
const { restrictUserLogin } = require("./Middlewares/auth");
const PORT = process.env.PORT;
require("./DataBase/DB");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(cookieParser());

// app.use("/user",restrictUserLogin, userRoute);
app.use("/user", userRoute);
app.use("/upload", fileRoute);

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
