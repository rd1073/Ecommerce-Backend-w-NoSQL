const express = require("express");

const {  ListOfSellers } =require("../controllers/buyerController");
 
const router = express.Router();


  
router.route("/list-of-sellers").get(ListOfSellers);


 
 
module.exports=  router ;