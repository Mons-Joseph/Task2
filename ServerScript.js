const express = require("express");
const fs = require("fs");
const statSync = require("fs").statSync;


let myApp = express();

myApp.get("/",(req,res)=>{
  console.log("req url",req.url);
  res.set('Content-Type', 'text/html')
  fs.createReadStream("D:\\Mons\\Code Projects\\Local Repository\\Task2\\index.html").pipe(res);
  //res.end();
});

myApp.get("/files",(req, res)=>{
  console.log("req url",req.url);
  fs.readdir("D:\\Mons\\Code Projects\\Node\\Random Directory",(err,files)=>{
    if(err){
      res.send("unknown error");
      console.log("error reading directory");
    }
    else if(files){
      let data = "Name of files:- ";
            for(file of files){
                data += file +"("+ statSync(`D:\\Mons\\Code Projects\\Node\\Random Directory\\${file}`).size+" bytes"+")"+", ";
            }
            console.log(data);
      res.json(data);
    }
  });
});

myApp.listen(80,()=>{
  console.log("listening at port 80");
});