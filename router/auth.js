const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../modles/userSchema");
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const cookieparser=require("cookie-parser");

router.use(cookieparser());


// router.post("/", async (req, res) => {
//   try {
//     const password = req.body.password;
//     const email = req.body.email;
//     const response = await User.findOne({ email: email });
//     if (response) {
//       if (await User.findOne({ password: password })) {
//         res.json(response);
//       } else {
//         res.status("422").json({ message: "login unsuccess" });
//       }
//     } else {
//       res.status("422").json({ message: "Invalid login" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// <------------- promise method ---------->
// router.post('/register',(req,res)=>{

//     const {name,email,phone,work,password,cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status('422').json({error:'please filled the field properly'})
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//         res.status('422').json({message:'user email are already exist'})
//         } else{
//             const user = new User({name:name,email:email,phone:phone,work:work,password:password,cpassword})
//             user.save()
//             .then(()=>{
//                 res.status('201').json({message:'registered successfully'})
//             })
//             .catch((err)=>res.status('500').json({erroe:"failed registered"}))
//         }
//     })
//     .catch((err)=>{ console.log('err')})
// })

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status("422")
      .json({ error: "please filled the field properly jhamlal" });
  }

  try {
    const response = await User.findOne({ email: email });
    if (response) {
      return res.status("422").json({ message: "user email are already exist" });
      console.log('user email are already exist')
    }
    else if(password != cpassword){
        res.json({message:'password are not match'})
        console.log('password are not match');
    } else {
    const user = new User({name:name,email: email,phone: phone,work: work,password: password,cpassword});
    const userRegister = await user.save();
    if (userRegister) {
      res.status("201").json({ message: "registered successfully" });
      console.log("registered successfully save data in database");
    } else {
      res.status("500").json({ erroe: "failed registered" });
      console.log("registered unsuccessfully to save data in database");
    }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (! email || ! password) {
      res.status("400").json({ message: "please filled the field properly" });
    } else { 
      const userLogin = await User.findOne({ email: email });
        if(userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        res.cookie('jwtoken',token,{
          expires: new Date(Date.now()+(1000*60*5)),
          httpOnly: true
        })
        console.log(token);
        if(!isMatch){
        res.status('400').json({message:'invalide pass id'})
        }else {
        res.json({message:'success full login'})
        console.log('Succefull login');
        }
    } else {
        res.status('400').json({message:'invalide id'})
    }
    }
    
  } catch (e) {
    console.log(e);
  }
});

// about us ka page
router.get('/about',authenticate,(req,res)=>{
  console.log('Hello about page');
  res.send(req.rootUser);
})
// Contact page
router.get('/getdata',authenticate,(req,res)=>{
  console.log('Hello about page');
  res.send(req.rootUser);
})
router.post('/contact', authenticate , async(req,res)=>{
  try {
    const {name,email,phone,message} = req.body;
    if( !name || !email || !phone || !message){
      console.log('Error in Contact form');
      res.json({message:'please field the data properly'})
    } else{
      const userContact = await User.findOne({_id:req.userId})
      if(userContact){
      const userMessage = await userContact.addMessage(name,email,phone,message);
      await userContact.save()
      res.status('201').json({message:'user contact successfully'})
      }
    }
  } catch (e) {
    console.log(e);
  }
})
// home page
router.get('/home', authenticate,(req,res)=>{
    res.send(req.rootUser)
})
// logout page
router.get('/logout', (req,res)=>{

    res.clearCookie("jwtoken",{path:'/'});
    res.status('200').send('user logout');
    console.log('logout successfully');
})


module.exports = router;
