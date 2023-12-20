const express = require("express");

const { CreateCatalog, GetMyOrders} =require("../controllers/sellerController");
 
const router = express.Router();
const protect=require("../config/protect")

  
router.route("/create-catalog").post(protect, CreateCatalog);

router.route("/orders").get(protect, GetMyOrders);

 
 
module.exports=  router ;