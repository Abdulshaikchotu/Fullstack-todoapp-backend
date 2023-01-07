const mongoose=require("mongoose")
const schema= mongoose.Schema

const regimodel=new schema({
   username:{type:String,required:true},
   password:{type:String,required:true},
   orders:{type:Array,required:false}
})

const collection=mongoose.model("Register",regimodel)

module.exports=collection