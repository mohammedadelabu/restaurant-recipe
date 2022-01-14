const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
import { User } from './interface'
const { verifyToken } = require("./verifyToken");
import { validateSignup, validateLogin } from '../validations/validation'


// REGISTER
router.post("/register", async (req: any, res: any) => {
  const newUser = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const isValid = validateSignup(req.body);
    if (isValid.error) {
      return res.status(400).json({
        status: "error",
        message: isValid.error.details[0].message,
      });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// LOGIN

router.post("/login", async (req: any, res: any) => {
  try {
    const isValid = validateLogin(req.body);
    if (isValid.error) {
      return res.status(400).json({
        status: "error",
        message: isValid.error.details[0].message,
      });
    } else {

      const user = await User.findOne({ fullname: req.body.fullname });
      !user && res.status(401).json("Wrong Credentials!");
  
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
  
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      OriginalPassword !== req.body.password &&
        res.status(401).json("Wrong Credentials!");
  
      generateToken(user, 200, res)
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

const generateToken = async (user: any, statusCode: any, res: any) => {
  const accessToken: User = jwt.sign({
    id:user._id, 
    isAdmin: user.isAdmin,
}, process.env.JWT_SEC,
{
    expiresIn:'1d'
  });

  const options = {
     httpOnly: true,
    expires: new Date(Date.now() + `${process.env.EXPIRE_TOKEN}`)
  };
  res
  .status(statusCode)
  .cookie('accessToken', accessToken, options)
  .json({success: true, message: "You are logged in", accessToken})
}

// LOG OUT USERS

  router.get("/logout", verifyToken, (req: any, res: any, next: any) => {
  res.clearCookie('accessToken');
  res.status(200).json({
    success: true,
    message:"logged out"
  })
})

export default router;
