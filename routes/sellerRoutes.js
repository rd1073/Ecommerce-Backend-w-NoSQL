const express = require("express");

const { CreateCatalog} =require("../controllers/sellerController");
 
const router = express.Router();
const protect=require("../config/protect")

  
router.route("/create-catalog").post(protect, CreateCatalog);


 
 
module.exports=  router ;