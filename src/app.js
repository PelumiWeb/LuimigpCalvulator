const path = require("path");
const express = require("express");
const app = express();

const port = process.env.PORT || 3030;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
