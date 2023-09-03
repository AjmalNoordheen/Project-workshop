const bcrypt = require("bcrypt");
const authToken = require("../middleWare/auth");
const env = require("dotenv").config();
const nodemailer = require("nodemailer");
const proSchema = require("../Model/mechanicSchema");
const userController = require("../controller/userController");
const { cloudinary } = require("../config/cloudinary");
const fs = require('fs');
const BookingSchema = require("../Model/BookingSchema");
const UserSchema = require("../Model/userSchema");
const transactionSchema = require("../Model/transactionSchema");

// ========Proffesional SignUp========= 

const ProffesionalSignup = async (req, res) => {
  try {
    const { name, email, mobile, password, repassword } = req.body;


    if (password !== repassword) {
      return res.json({ status: false, message: "Passwords don't match" });
    }

    const userDetails = await proSchema.findOne({ email: email });
    const existPhone = await proSchema.findOne({ phone: mobile });

    if (!userDetails) {
      if (existPhone) {
        return res.json({
          status: false,
          message: "Phone number already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userDEtails = await proSchema.create({
        name: name,
        email: email,
        phone: mobile,
        password: hashedPassword,
        isVerified: true,
      });

      const verifyEmail = await userController.sendVerifyMail(
        userDEtails.name,
        userDEtails.email,
        userDEtails._id,
        1
      );

      if (verifyEmail.result) {
        return res.json({
          status: true,
          message: "Registration Success, Please Verify Your Mail",
        });
      } else {
        await proSchema.deleteOne({ email: userDEtails.email });
        return res.json({ status: false, message: "Email Not Sent" });
      }
    } else {
      if (userDetails.isgoogleVerified === true) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await proSchema.updateOne(
          { email: userDetails.email },
          {
            $set: {
              name: name,
              email: email,
              phone: mobile,
              password: hashedPassword,
              isVerified: true,
            },
          }
        );
        return res.json({
          status: true,
          message: "Registration Success, please Login",
        });
      } else {
        return res.json({ status: false, message: "User already exists" });
      }
    
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "An error occurred" });
  }
};


// ==============Proffesional Login===========

const proffesionalLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await proSchema.findOne({ email: email });
    if (!user) {
      return res.json({ status: false, message: "Invalid email" });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ status: false, message: "Incorrect password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ status: false, message: "Email is not verified" });
    }

    const token = authToken.generateProToken(user);
    const userSignUp = {
      Status: true,
      message: "You are logged in",
      token: token,
      name: user.name,
      email:user.email
    };
    res.status(200).json({ userSignUp,user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "An error occurred" });
  }
};


// ==========Login googleMailDetails============

const googleMailDetails = async (req, res) => {
  try {
    const payloadDetails = req.body;

   
    const userDetails = await proSchema.findOne({
      email: payloadDetails.email,
    });
    let userSignUp = {
      Status: false,
      message: null,
      token: null,
      name: null,
      email:null
    };
    if (userDetails) {
      if (userDetails.isgoogleVerified == false) {
        userSchema.updateOne(
          { _id: userDetails._id },
          { $set: { isgoogleVerified: true } }
        );
      }
      const token = authToken.generateToken(userDetails);
      (userSignUp.Status = true),
        (userSignUp.message = "you are logged in"),
        (userSignUp.token = token),
        (userSignUp.name = userDetails.name);
      res.json({ userSignUp });
    } else {
      const newUser = await proSchema.create({
        name: payloadDetails.name,
        email: payloadDetails.email,
        isVerified: true,
        isgoogleVerified: true,
      });
      const token = authToken.generateToken(newUser);

      (userSignUp.Status = true),
        (userSignUp.message = "you are logged in"),
        (userSignUp.token = token),
        (userSignUp.name = newUser.name);
        userSignUp.email = userDetails.email

      res.json({ userSignUp,user:userDetails });
    }
  } catch (error) {
    console.log(error);
  }
};

// ===============OTP checkMobile =============
const otpCheckMobile = async (req, res) => {
  try {
    const { newPhone } = req.body;
    const user = await proSchema.findOne({ phone: newPhone });
    if (user) {
      const token = authToken.generateToken(user);
      const data = {
        token,
      };
      res.status(200).json({ data });
    } else {
      res.status(404).json({ errMsg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ errMsg: "Server Error" });
  }
};

// ========================Check Proffesional======================
const checkProffesional = async (req, res) => {
  try {
    const email = req.query.email;
    const pro = await proSchema.findOne({ email: email, fees: 0 });
    if (pro) {
      res.status(200).json({ pro: pro });
    } else {
      res.status(500);
    }
  } catch (error) {
    res.status(500);
  }
};

// ==================updateProFessional===========

const updatePro = async (req, res) => {
  try {
    const { email, state, dropdown, address, fees, time ,locationQuery,locationData} = req.body;
    const file = req.file
    const Prodetails = await proSchema.findOne({ email: email,fees:0 });
    let img
    if (Prodetails) {
      const upload = await cloudinary.uploader.upload(file?.path)
      img = upload.secure_url
      const updateData = {
        work: dropdown,
        address: address,
        fees: fees,
        workingTime: time,
        location:locationQuery,
        image:img,
        map:locationData
      };
     const proData = await proSchema.updateOne({ _id: Prodetails._id }, { $set: updateData })
      const promises = state.map((item) => {
        return proSchema.findOneAndUpdate(
          { email: email },
          { $push: { types: item } },
          { new: true }
          );
        });
        
        const updatedDocuments = await Promise.all(promises);    
        fs.unlinkSync(file.path)   
      res.status(200).json({message:'start your Journey',image:proData.image})
    }else{
      res.status(200).json({data:'ok'})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

 
// ==========================List WorkShops==================

  const listWorkShop = async(req,res)=>{
    try {
      const WorkShop = await proSchema.find({work:'workshop'}).populate('types')
      if(WorkShop){
        res.status(200).json({WorkShop})
      }else{
        res.status(500)
      }
    } catch (error) {
      res.status(500)
    }
  }

// =========================List Freelancers=====================
  const listFreelancer = async(req,res)=>{
    try {
      const Freelancer = await proSchema.find({work:'freelancer'}).populate('types')
      console.log(Freelancer.types);
      if(Freelancer){
        res.status(200).json({Freelancer})
      }else{
        res.status(500)
      }
    } catch (error) {
      res.status(500)
    }
  }


  // ===============proMapDetails===============
  const proMapDetails = async(req,res)=>{
    try {
      const {email} = req.query
      const pro = await proSchema.findOne({email:email})
      if(pro){
        res.json({message:'success',longitude:pro.map[0],latitude:pro.map[1],pro:pro})
      }else{
        res.status(500)
      }

    } catch (error) {
      res.status(500)
    }
  }

// =====================proProfile=================

const proProfile = async(req,res)=>{
  try {
    const id = req.query.proId
    const proDetails = await proSchema.findOne({_id:id}).populate('types')
    if(proDetails){
      res.status(200).json(proDetails)
    }else{
      res.status(500)
    }
  } catch (error) {
    res.status(500)
  }
}

// ============================Edit proffessionals details====================

  const updateEditPro = async(req,res)=>{
    try {
      const {time,name,fees,address,id} = req.body
      const file = req.file
     let img
     if(file){
       const upload = await cloudinary.uploader.upload(file?.path)
      img = upload.secure_url
     }
     
      console.log(img);
     const proEDit = await proSchema.updateOne({_id:id},{$set:{
            name:name,
            workingTime:time,
            fees:fees,
            address:address,
            image:img
     }})
     console.log(proEDit);
     if(proEDit){
      res.json('success')
     }else{
      res.json('something went wrong')
     }
    } catch (error) {
      res.status(500)
    }
  }


// =====================Bookings detaila of Proffessional===============
  const proBookings = async(req,res)=>{
    try {
      const {request,id} = req.query
      
       // IF REQUEST WANT TO ACCESPT
      if(request=='requested'){
        const requests = await BookingSchema.find({mechanic:id,request:'requested'}).populate('user').populate('mechanic')
        if(requests){
          res.json({status:'success',bookingDetails:requests})
        }else{
          res.json({status:'failed'})
        }

        // IF STATUS IS PENDING 
      }else if(request=='pending'){
        const requests = await BookingSchema.find({mechanic:id,status:'pending',request:'Accepted'}).populate('user').populate('mechanic')
        if(requests){
          res.json({status:'success',bookingDetails:requests})
        }else{
          res.json({status:'failed'})
        }
      }
        // CANCELLED BOOKINGS
      else if(request=='cancelled'){
        console.log("JIII");
        const requests = await BookingSchema.find({mechanic:id,status:'cancelled',request:'Rejected'}).populate('user').populate('mechanic')
        if(requests){
          res.json({status:'success',bookingDetails:requests})
        }else{
          res.json({status:'failed'})
        }
      }
      // COMPLETED BOOKINGS
      else if(request=='completed'){
        console.log("JIII");
        const requests = await BookingSchema.find({mechanic:id,status:'completed'}).populate('user').populate('mechanic')
        if(requests){
          res.json({status:'success',bookingDetails:requests})
        }else{
          res.json({status:'failed'})
        }
      }

    } catch (error) {
      res.status(500)
    }
  }

// ===========================Update Bookings=================

  const updateBookingStatus = async(req,res)=>{
      try {
        const {status,id} = req.query
      // BOOKING ACCEPTED BY PRO
        if(status=='accept'){
          const updatedBooking = await BookingSchema.updateOne({_id:id},{$set:{status:'pending',request:'Accepted'}})
          if(updatedBooking){
            res.json({status:'success',bookingDetails:updatedBooking})
          }
        }
         // BOOKING REJECTED BY PRO
        else if(status=='reject'){
          const updatedBooking = await BookingSchema.findOneAndUpdate({_id:id},{$set:{status:'cancelled',request:'Rejected'},
          $unset: {
            unSavedDate: 1 // Set to 1 to indicate that you want to remove the field
          }}).populate('user')

         const usersss = await UserSchema.updateOne({_id:updatedBooking.user._id},{$inc:{
            wallet:updatedBooking.fees
         }})

        //  creation of transaction

         const transaction = await transactionSchema.create({
              PaymentType:'in',
              date:new Date(),
              bookingId:id
         })

          if(updatedBooking && usersss){
            res.json({status:'success',bookingDetails:updatedBooking})
          }
        }
         // WORK COMPLETED BY PRO
         else if(status=='completed'){
          const updatedBooking = await BookingSchema.findOneAndUpdate({_id:id},{$set:{status:'completed',request:'completed'},
          $unset: {
            unSavedDate: 1 // Set to 1 to indicate that you want to remove the field
          }}).populate('mechanic')
console.log(updatedBooking.mechanic._id,'IDDDDDD');
          const proffessional = await proSchema.updateOne({_id:updatedBooking.mechanic._id},{$inc:{
            wallet:updatedBooking.fees
          }})

          console.log(proffessional,'PROFFESSIONAL');
          const transaction = await transactionSchema.create({
            PaymentType:'in',
            date:new Date(),
            bookingId:id
          })

          if(updatedBooking&&proffessional){
            res.json({status:'success',bookingDetails:updatedBooking})
          }

      }
    } catch (error) {
        console.log(error);
      }
  }

module.exports = {
  ProffesionalSignup,
  proffesionalLogin,
  googleMailDetails,
  otpCheckMobile,
  checkProffesional,
  updatePro,listWorkShop,
  listFreelancer,
  proMapDetails,
  proProfile,updateEditPro,
  proBookings,updateBookingStatus,
};