import User from "../Models/user.js";
import { setUser,getUser } from "../Service/auth.js";

async function handleUserSignup(req, res) {
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    return res.redirect("/")
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function handleUserLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if(!user){
        return res.render('login',{message:"Invalid Credentials"});
      }

      const token=setUser(user);
      res.cookie('uid',token);
      return res.redirect("/");

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

export  {handleUserSignup,handleUserLogin};