const path = require("path");
const express = require("express");
const app = express();

const port = process.env.PORT || 3030;
const publicDirectlyPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectlyPath));

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
