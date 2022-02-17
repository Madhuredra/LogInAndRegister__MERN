const express  = require( "express")
const cors  = require( "cors")
const mongoose  = require( "mongoose")
const connectDB = require("./Database/db")
const userModel = require("./Model/userModel")

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//Database Connection
connectDB();

//Mongo DB User Schema
const userSchema = userModel();

//MongoDb Model
const User = new mongoose.model("User", userSchema)

//Log In Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfully", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

//Register Routes
app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("Server started at port 9002")
})