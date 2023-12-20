// middleware/authenticateSeller.js
const jwt = require('jsonwebtoken');
const { User } = require("./db");

const protect = async (req, res, next) => {
  //const token = req.header('Authorization');
  token = req.headers.authorization.split(" ")[1];

  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'abcd'); // Use your actual secret key
    //console.log('Decoded Token:', decoded);

    /*if (decoded.exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTimestamp) {
        return res.status(401).json({ msg: 'Token has expired' });
      }
    }*/
    /*if (decoded.userType !== 'seller') {
      return res.status(401).json({ msg: 'Not authorized as a seller' });
    }*/

   /* const user = await User.findById(decoded.id, {
      attributes: { exclude: ['password'] }
    });*/
    const user = await User.findById(decoded.id).select("-password");


    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = user;
   // console.log(user);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
 

module.exports = protect;