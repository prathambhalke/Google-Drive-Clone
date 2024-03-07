require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
require("./DataBase/DB");
app.use(express.json());

const ClientId = "84961247839-jmp9hf92th2sri1om42pmt6mkfupuhsd.apps.googleusercontent.com";
const ClientSecret = "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";

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json("server started");
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
