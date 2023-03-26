// this is only need to catch .env config and set to process, by default this doesn't work correctly
// https://stackoverflow.com/questions/71762254/app-not-running-on-port-defined-in-env-file-nodejs
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running port: ${PORT}!`);
});
