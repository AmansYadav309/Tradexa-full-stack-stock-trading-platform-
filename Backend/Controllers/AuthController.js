const User = require("../Model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, username, createdAt } = req.body;
    
    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Email, password, and username are required" });
    }
    //find user in Database 
    const existingUser = await User.findOne({ email });
    //if user alread there in DB 
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    //if not in Db  create a user 
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });    
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user, token });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up user", error: error.message });
  }
};



module.exports.Login  =  async(req,res)=> { 
  try{
  const {password ,  email} = await req.body; 
  if(!email || !password){ 
    return res.json({message : "All fileds are requored "}); 
  }
  const userexest= await User.findOne({email});
  if(!userexest){
    return res.json({message : "user did not exest"});
  }
  const usercomp = await bcrypt.compare(password , userexest.password);
  if(!usercomp) { 
   return res.json({message : "incorrect user email or password"})
  }

  const token = createSecretToken(userexest._id);
   res.cookie( 'token' ,token, {
           withCredentials: true,
          httpOnly: false,
        } );
         res.status(201).json({ message: "User logged in successfully",})
  } 
  catch (error) {
     console.error(error);
      return res.json({message : "Somthing went wrong"})
    }

}  




















// module.exports.Login = async(req,res,next) =>{
//   try {
//         const {email , password} = req.body;
//         if (!email || !password) {
//           return res.json({message: "All fields are required"});
//         }
//         const user=  await User.findOne({email})
//         if (!user) {
//           return res.json({message: "Incorrect password or email"})
//         }
//         const auth = await bcrypt.compare(password , user.password)
//         if(!auth){
//           return res.json({message: "Incorrect password or email"})
//         }
//         const token = createSecretToken(user._id);  
//         res.cookie( 'token' ,token, {
//            withCredentials: true,
//           httpOnly: false,
//         } );
//          res.status(201).json({ message: "User logged in successfully", success: true });
//      next()
//   } catch (error) {
//      console.error(error);
//   }
// } 