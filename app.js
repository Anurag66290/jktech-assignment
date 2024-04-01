import express from "express";
import mongoose from "mongoose";

import path from "path";

import fileUpload from "express-fileupload";
const __dirname = path.resolve();;
import fs from "fs";

import http from "http";
import bucketRoute from "./routes/bucketRoute.js";
import objectRoute from "./routes/objectRoute.js";

const app = express();

const server = http.createServer(app);
//--------------------------------
// Set View Engine
//--------------------------------
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  fileUpload({
    useTempFiles: true,
  })
);


mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://localhost:27017/JKTECH",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => {
    console.log("Db Connected.....");
  })
  .catch((err) => {
    console.log(err, "=========err=========");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bucket", bucketRoute);
app.use("/object", objectRoute);


// app.use(errorHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
