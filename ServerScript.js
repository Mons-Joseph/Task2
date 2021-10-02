const http = require("http");
const fs = require("fs").promises;
const statSync = require("fs").statSync;

let myServer = http.createServer((req, res) => {
    console.log("Connected");
    res.writeHead(200, "successfully connected", { "Content-Type": "text/html" });

    if (req.url == "/") {
        fs.readFile("D:\\Mons\\Code Projects\\Node\\Task2\\index.html", "utf-8").then((data) => {
            res.end(data);
        }).catch((err) => {
            if (err) {
                res.end("error occured");
                throw err;
            }
        });
    } else if (req.url == "/files") {
        console.log("requested files");
        
        //start
        fs.readdir("D:\\Mons\\Code Projects\\Node\\Random Directory").then((files) => {
            let data = "Name of files:- ";
            for(file of files){
                data += file +"("+ statSync(`D:\\Mons\\Code Projects\\Node\\Random Directory\\${file}`).size+" bytes"+")"+", ";
            }
            console.log(data);

            let html = 
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Document</title>
                <style>
                    .wrapper {
                        position:absolute;
                        left:35%;
                        top:55%;
                        margin-top:-150px;
                        margin-left:-150px;
                    }
                </style>
            </head>
            <body>
                <div class="wrapper">
                    <center>
                        <p>${data}</p>
                    </center>
                </div>
            </body>
            </html>`;
            res.end(html);
        });
        //end

    }
});

myServer.listen(80);