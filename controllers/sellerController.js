const { User,  Catalog , Order}=require("../config/db")




const CreateCatalog = async (req, res) => {
    try {
        const { products } = req.body;
        const seller = req.user.id; // Assuming your authentication middleware adds the user to the request object
        //console.log(sellerId);
        //console.log(req.body);
        // Create a new catalog for the logged-in user/seller
    const newCatalog = new Catalog({
        
        products: products.map(products => ({ name: products.name, price: products.price })),
        seller,
      });
      newCatalog.save().then(async (catalog) => {
        console.log("Catalog created successfully:", catalog);
  
        // Populate the 'seller' field with the 'username'
        await catalog.populate({
            path: 'seller',
            select: 'username',
          });

        res.json({ msg: 'Catalog created successfully', catalog });
      });   
           
      } catch (error) { 
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
      }
  }; 
  const GetMyOrders = async (req, res) => {
    try {
      const sellerId = req.user.id;  
      const orders = await Order.find({ seller: sellerId }).populate('products', 'buyer name price');
  if(!orders){
    console.log("no orders for this seller")
  }
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error getting user orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  module.exports = { CreateCatalog, GetMyOrders };
