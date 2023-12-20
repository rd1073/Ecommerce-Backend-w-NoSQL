const { User }=require("../config/db")



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
  
  module.exports={ListOfSellers}