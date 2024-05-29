require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute = require("./Routes/userRoute");
const fileRoute = require("./Routes/fileRoute");
const { restrictUserLogin } = require("./Middlewares/auth");
require("./DataBase/DB");

// Initialize the express application
const app = express();

// Retrieve PORT from environment variables with a fallback value
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies with increased payload limit
app.use(express.json({ limit: "50mb" }));

// Middleware to parse URL-encoded bodies with increased payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Configure CORS to allow requests from the specified origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Use userRoute with the restrictUserLogin middleware
app.use("/user", restrictUserLogin, userRoute);

// Use fileRoute for file upload handling
app.use("/upload", fileRoute);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
