require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({
    origin : "http://localhost:5000",
    methods : "GET, POST, PUT, DELETE",
    credentials : true,
}))

app.get("/", (req, res) => {
    res.status(200).json("server started");
})

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))