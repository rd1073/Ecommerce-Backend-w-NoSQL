const express = require("express");
const mongoose = require("mongoose");
const conn=require("./config/db")
const authRoutes=require("./routes/authRoutes")
const buyerRoutes=require("./routes/buyerRoutes");
const sellerRoutes=require("./routes/sellerRoutes");
const app = express();
app.use(express.json());

 //auth api
app.use("/api/auth", authRoutes);

//buyer api
app.use("/api/buyer", buyerRoutes);

//seller api
app.use("/api/seller", sellerRoutes);


 
app.listen(5000,console.log(`Server running on 5000`));


 
 


 



 