const { User }=require("../config/db")
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

 

const Register = async (req, res) => {
    try {
      const { username, password, userType } = req.body;
      console.log("Request Body:", req.body);
  
      if (!username || !password|| !userType ) {
        res.status(400).json({ error: "Please Enter all the Fields" });
        return;
      }
  
      // Check if user already exists
      const userExists = await User.findOne({ username });
  
      if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        username,
        password: hashedPassword,
        userType,

      });
  
      // Save the user instance to the database
      const user = await newUser.save();
  
      console.log("User saved:", user);
  
      res.status(201).json({
        _id: user._id,
        username: user.username,
        userType: user.userType,
        
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error probably" });
    }
  };

  const Login = async (req, res) => {
    try {
      const { username, password } = req.body;
      //console.log("Request Body:", req.body);

  
      if (!username || !password) {
        res.status(400).json({ error: "Please Enter all the Fields" });
        return;
      } 
  
      // Check if user already exists
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log("login succesful");
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
          });
      } else{
        res.status(401);
        throw new Error("Invalid Email or Password");

      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error probably" });
}};


  module.exports={ Register, Login}
  