const express = require("express");
const app = express();
const port = 3000;
const public = path.join(__dirname, "../client/home/index.html");

app.use(express.static(public));

app.get("/", function(req, res) {
  res.sendFile(public);
});

app.listen(port, () => console.log(`http://localhost:${port}`));