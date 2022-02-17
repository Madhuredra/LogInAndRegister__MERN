const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/khatabook", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})
}

module.exports = connectDB;