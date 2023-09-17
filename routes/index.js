var express = require('express');
var router = express.Router();
const fs=require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  const files = fs.readdirSync("public/database");
  res.render('index', { files:files });
});


// to create file

router.post("/create", function(req, res, next) {
  fs.writeFileSync(`public/database/${req.body.filename}`,"")
  res.redirect("/");
  
});

// to Delete file

router.get("/delete/:filename", function(req,res){
  fs.unlinkSync(`public/database/${req.params.filename}`);
  res.redirect("/");

})

// To Open File
router.get("/open/:filename", function(req,res){
  // fs.open(`public/database/${req.params.filename} , "r"`,"");
  fs.open(`public/database/${req.params.filename}`,`r`,function(){});
  res.redirect("/");

})

module.exports = router;
