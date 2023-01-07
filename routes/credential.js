// const { Router } = require("express")
const express=require("express")
// let mongoose=require("mongoose")
let router=express.Router()
let registermodel=require("../models/register")
var jwt = require('jsonwebtoken')

router.get("/register",async(req,res)=>{
    try{
        let Register=await registermodel.find()
        res.send({
              status:"sucess",
              data:Register
        })

    }
    catch(e){
        res.json({
            status:"fail",
            msg:e.message
        })
    }
})

router.post("/register/post",async(req,res)=>{
     try{

        let {username}=req.body
        let postusercre=await registermodel.findOne({username})
        if(postusercre){
            res.status(400).json({
               status:"user alredy present with given name"
            })
        }

        await registermodel.create(req.body) 
         res.send({
            status:"success",
            data:"sucessfully registerd"
         })

     }
     catch(e){
        res.json({
            status:"fail",
            msg:e.message
        })
     }
})

router.post("/login",async(req,res)=>{
    try{
        //  let {username}=req.body
         let datauser=await registermodel.findOne({username:req.body.username})
         if(!datauser){
           res.status(400).json({
            status:"user not present please register"
           })
         }
         let token= await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: datauser._id
        }, 'khaleed');
        console.log(token);
        return res.json({
            status:"login successful",
            // data:datauser._id,
            token
        })
    }
    catch(e){
        res.json({
            msg:e.message,
            status:"backend error"
        })
    }
})
module.exports=router