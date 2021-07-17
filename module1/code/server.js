var path = require("path");
var express = require("express");
var app = express();

// Serve up content from public directory
app.use(express.static(path.join(__dirname, "dist")));

var server = app.listen(9000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("listening on http://" + host + ":" + port + "/");
});
