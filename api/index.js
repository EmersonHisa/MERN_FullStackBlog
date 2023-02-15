const express = require("express");
const app = express();
const path = require("path");
var cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const multer = require("multer");

//load variables in .env files
const dotenv = require("dotenv");
const { application } = require("express");
dotenv.config();

//connect database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));


//multer upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("sent");
});
//set route
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use("/api/cats", catRoute);
//set port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend is running");
});
