const { User, Catalog, Order }=require("../config/db")



const ListOfSellers = async (req, res) => {
    try {
        // Find all users with userType 'seller'
        const sellers = await User.find({ userType: 'seller' });
    
        res.json(sellers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    };


    const GetSellerCatalog = async (req, res) => {
        try {
          const {seller_id } = req.params;
      
          const seller = await User.findOne({ _id:seller_id });
      //console.log(seller)
          if (!seller ) {
            return res.status(404).json({ error: 'Seller not found' });
          }
      
          const catalog = await Catalog.findOne({ seller: seller._id })
            .populate('seller', 'username').exec();
            //console.log(catalog)
      
          if (!catalog) {
            return res.status(404).json({ error: 'Catalog not found' });
          } 
      
          res.status(200).json(catalog);
        } catch (error) {
          console.error('Error getting food items by user:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };


const CreateOrder= async (req, res) => {
    try {
        const { seller_id } = req.params;
        const { products } = req.body;
        const buyerId = req.user.id; // Assuming your authentication middleware adds the user to the request object



         
       
      
        // Create an order
        const order = new Order({
          buyer: buyerId,
          seller: seller_id,
          products: products.map(item => ({ product: item.productId, quantity: item.quantity })),
          
         //totalAmount: totalAmount,
        });
    
        // Save the order to the database
        const savedOrder = await order.save();
    
        res.status(201).json({ msg: 'Order created successfully', order: savedOrder });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
      }


}

  
  module.exports={ListOfSellers, GetSellerCatalog, CreateOrder}