let express=require("express")
let app=express()
let cors=require("cors")
let mongoose=require("mongoose")
var jwt=require("jsonwebtoken")
let bodyparser=require("body-parser")
const port = process.env.port || 5000;
const MongoDBURl = process.env.MongoDbUrl || 'mongodb://0.0.0.0:27017/fullstackapp'
 

let credential=require("./routes/credential")
let login=require("./routes/login")
//  app.use()
app.use(cors())

app.use(bodyparser.json())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use("/",credential)
app.use("/successfulLogin",async(req,res,next)=>{
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'khaleed', function (err, decoded) {
            if (err) {

                return res.json({
                    status: 'Fail',
                    massage: "Not a valid token."
                })
            }
            req.user = decoded.data;
            console.log(req.body)
            next()
        })
    }
    else {
        return res.status(401).json({
            status: 'Fail',
            massage: 'Token not Found'
        })
    }
})
    
app.use(login)

mongoose.connect(MongoDBURl,(e,db)=>{
    if(e){console.log("error from db",e)}
    else{console.log("connected to db")}
})
app.listen(port,()=>{console.log("server up at 5000")})