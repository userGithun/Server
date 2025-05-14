const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')

// Configuration
cloudinary.config({
  cloud_name: 'ddblbrvxl',
  api_key: '674549153778279',
  api_secret: 'tdXOWN_-uNiQUxj8Emqd8KvJcUA'
});

class UserController {
    static signUp = async (req, res) => {
        try {
          const { name, email, password, phone, confirmPassword } = req.body;
          // console.log(req.body);
          // Check if all fields are provided
          if (!name || !email || !password || !phone || !confirmPassword) {
            return res
              .status(400)
              .json({ status: "failed", message: "All fields are required!" });
          }
          // Check if password and confirm password match
          if (password !== confirmPassword) {
            return res
              .status(400)
              .json({ status: "failed", message: "Password doesn't match" });
          }
          // Check if the user already exists
          const existingUser = await UserModel.findOne({ email: email });
          if (existingUser) {
            return res
              .status(400)
              .json({ status: "failed", message: "Email already exists" });
          }
          // Check if the phone number already exists
          const phoneNo = await UserModel.findOne({ phone });
          if (phoneNo) {
            return res
              .status(400)
              .json({ status: "failed", message: "Phone number already exists" });
          }

          //image upload 
          const file = req.files.image;
          const imageupload = await cloudinary.uploader.upload(
            file.tempFilePath,
            {
              folder: "APIuser",
            }
          )
          // Hashing the password
          const hashedPassword = await bcrypt.hash(password, 10);
          // Create a new user
          const userData = await UserModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            image:{
              public_id:imageupload.public_id,
              url:imageupload.secure_url
            }
          });
        //   Generating token and storing in cookies
        //   const token = jwt.sign({ ID: userData._id }, 'khuch bhii');
        //   res.cookie("token", token, { httpOnly: true });
    
          // Return the created user data or a success message
          return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: userData,
          });
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ status: "failed", message: "Internal server error" });
        }
      };

      static signIn = async (req, res) => {
        try {
          const { email, password } = req.body;
    
          // Validate required fields
          if (!email || !password) {
            return res.status(400).json({
              status: "failed",
              message: "Email and password are required.",
            });
          }
    
          // Find user by email
          const user = await UserModel.findOne({ email });
          if (!user) {
            return res.status(401).json({
              status: "failed",
              message: "You are not a registered user.",
            });
          }
    
          // Compare passwords
          const isMatched = await bcrypt.compare(password, user.password);
          if (!isMatched) {
            return res.status(401).json({
              status: "failed",
              message: "Invalid email or password.",
            });
          }
    
          // Generate JWT token
          const token = jwt.sign(
            { ID: user._id },"khuch bhii",{ expiresIn: "1d" } // Optional: token expiration
          );
    
          // Set token in cookies
          res.cookie("token", token, {
            httpOnly: true, // Prevent access via client-side JavaScript
            // secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
            // maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
    
          // Respond with success
          return res.status(200).json({
            status: "success",
            message: "Login successful.",
            token,
            user,
          });
        } catch (error) {
          console.error("Error during sign-in:", error);
    
          // Internal server error
          return res.status(500).json({
            status: "failed",
            message: "Internal server error.",
          });
        }
      };

      static getUser = async (req, res) => {
        try {
          const { id } = req.udata;
          // console.log(req.UserData)
          const data = await UserModel.findById(id);
          return res
            .status(200)
            .json({ status: "success", message: "user details found", data });
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ status: "failed", message: "Internal server error." });
        }
      };
      static logOut = async (req, res) => {
        try {
          // Assuming the token is stored in a cookie, you don't need to log the token here
          res.status(201)
            .cookie('token', "", {
              httpOnly: true,
              expires: new Date(Date.now()), // Expire immediately
            })
            .json({
              success: true,
              message: "Logout Successfully",
            });
        } catch (error) {
          console.log(error);
          res.status(401).json({
            status: "failed",
            message: error.message
          });
        }
      }
      static changePassword = async (req,res)=>{
        try {
          const {id} = req.udata;
          const {op, np, cp} = req.body;

          const user = await UserModel.findById(id);
          //verifiying old password
          const isMatched = await bcrypt.compare(op, user.password);
          if (!isMatched) {
            return res.status(401).json({
              status: "failed",
              message: "Old Password is incorrect",
            });
          }
          if(np !== cp){
            return res.status(401).json({
              status: "failed",
              message: "New Password and Confirm Password are not same",
            });
          }

          //new password
          const hashedPassword = await bcrypt.hash(np, 10);
          await UserModel.findByIdAndUpdate(id, {
            password: hashedPassword
          });
          return res.status(201).json({
            status: "success",
            message: "Password Changed Successfully",
          });

        } catch (error) {
          console.log(error);
          res.status(401).json({
            status: "failed",
            message: error.message
          });
        }
      }
      static profileUpdate = async (req,res)=>{
        try {
          const {id} = req.udata;
          const {name,email} = req.body;
          if (req.files) {
            const user = await UserModel.findById(id);
            const ImageID = user.image.public_id;

            //deleting previous image
            await cloudinary.uploader.destroy(ImageID);

            //new image up..
            const imagefile = req.files.image;
            const imageupload = await cloudinary.uploader.upload(
              imagefile.tempFilePath,
              {
                folder: "APIuser",
              }
            );
            var data ={
              name:name,
              email:email,
              image:{
                public_id:imageupload.public_id,
                url:imageupload.secure_url
              }
            };

          }else{
            var data = {
              name: name,
              email: email
            }
          }
          await UserModel.findByIdAndUpdate(id, data);
          return res.status(201).json({
            status: "success",
            message: "Profile Updated Successfully",
          });

        } catch (error) {
          console.log(error);
          res.status(401).json({
            status: "failed",
            message: error.message
          });
          
        }
      }

    
}
module.exports = UserController;
