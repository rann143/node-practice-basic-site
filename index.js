const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let filename = q.pathname + ".html";
  if (q.pathname === "/") {
    filename = "index.html";
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  try {
    const html = fs.readFileSync(filename);
    res.write(html);
    res.end();
  } catch (err) {
    res.statusCode = 404;
    const errorPage = fs.readFileSync("404.html");
    res.write(errorPage);
    console.log(err);
    res.end();
  }
});

const port = 8080;

server.listen(port, function () {
  console.log("Server running on " + port);
});
