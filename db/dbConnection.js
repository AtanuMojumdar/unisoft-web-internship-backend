const mongoose = require('mongoose');
const process = require("process")


//DB Connect
async function dbConnection() {

    try {
        
        await mongoose.connect("mongodb+srv://atanu2003mojumdar:9Lw6mVWhMQPxr7Jd@cluster0.deae3e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        console.log("DB Connection Successful!")


    } catch (error) {
        console.log("DB Connection Failed!")
        process.exit(-1)
    }
    
}

module.exports = dbConnection