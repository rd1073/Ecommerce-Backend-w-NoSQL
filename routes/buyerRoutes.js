const express = require("express");

const {  ListOfSellers, GetSellerCatalog } =require("../controllers/buyerController");
 
const router = express.Router();


  
router.route("/list-of-sellers").get(ListOfSellers);
router.route("/seller-catalog/:seller_id").get(GetSellerCatalog);



 
 
module.exports=  router ;