const http = require("http");
const fs = require("fs");
const statSync = require("fs").statSync;

let myServer = http.createServer((req, res) => {
  console.log("Connected");
  res.writeHead(200, "successfully connected", { "Content-Type": "text/html" });

  if (req.url == "/" && req.method === "GET") {
    fs.createReadStream("D:\\Mons\\Code Projects\\Local Repository\\Task2\\index.html").pipe(res);
  }

  if (req.url == "/files" && req.method === "GET") {
    console.log("requested files");

    fs.readdir("D:\\Mons\\Code Projects\\Node\\Random Directory", (err, files) => {
      if (err) {
        res.send("unknown error");
        console.log("error reading directory");
      }
      else if (files) {
        let data = "Name of files:- ";
        for (file of files) {

          function sizeConverter(size){
            if(size > 1024 && size < 1024 * 1024){
              return size/1024 + "Kb";
            }else if(size > 1024 * 1024){
              return size/ (1024 * 1024) + "Mb"
            }else{
              return size + "bytes"
            }
          }

          let fileSize = statSync(`D:\\Mons\\Code Projects\\Node\\Random Directory\\${file}`).size
          data += file + "(" + sizeConverter(fileSize) + ")" + ", ";
        }
        res.end(JSON.stringify(data));
        console.log(data);
      }
    });

  }
});

myServer.listen(80);