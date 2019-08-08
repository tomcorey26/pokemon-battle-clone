const express = require("express");
const app = express();
const port = 3000;
const public = path.join(__dirname, "../client/home");

app.use(express.static(public));

app.get("/test", function(req, res) {
  res.send("Hello World");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
