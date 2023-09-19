var express = require('express');
var router = express.Router();
const fs=require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  const files = fs.readdirSync("public/database");
  res.render("index", { files:files, filename:null, filedata:null });
});


// to create file

router.post("/create", function(req, res, next) {
  fs.writeFileSync(`public/database/${req.body.filename}`,"")
  res.redirect("`/open/${req.body.filename}`");
  
});

// to Delete file

router.get("/delete/:filename", function(req,res){
  fs.unlinkSync(`public/database/${req.params.filename}`);
  res.redirect("/");

})

// To Open File

router.get("/open/:filename",function(req, res){
  const files = fs.readdirSync("public/database");
  const filedata=fs.readFileSync(`public/database/${req.params.filename}`,"utf-8");
  res.render("index",{
    files: files,
    filedata: filedata,
    filename :req.params.filename,
  });

});


// TO SAVE

router.post("/save/:filename",function(req,res){

    fs.writeFileSync(`public/database/${req.params.filename}`,
    req.body.filedata);
    res.redirect(`/open/${req.params.filename}`);
});

module.exports = router;
