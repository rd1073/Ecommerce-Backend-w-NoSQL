const express = require("express");

const {  ListOfSellers, GetSellerCatalog, CreateOrder } =require("../controllers/buyerController");
const protect=require("../config/protect")

const router = express.Router();


  
router.route("/list-of-sellers").get(ListOfSellers);
router.route("/seller-catalog/:seller_id").get(GetSellerCatalog);
router.route("/create-order/:seller_id").post(protect,CreateOrder);




 
 
module.exports=  router ;