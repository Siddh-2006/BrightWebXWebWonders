const express=require("express");
const router=express.Router();
const upload=require("../config/multer-config");
const {registerUser,loginUser,logoutUser}=require("../controllers/userController");
const isLoggedIn=require("../middlewares/isLoggedIn");

router.get("/",(req,res)=>{
    res.send("hey");
})

router.post("/register",upload.single("profilePhoto"),registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);

module.exports=router;