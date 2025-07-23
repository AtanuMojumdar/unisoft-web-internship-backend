//Imports
const express = require("express")
const dbConnection = require("./db/dbConnection.js")
const cors = require("cors")
const User = require("./db/models/UserSchema.js")
const bcrypt = require("bcryptjs")

//GLOBAL
const app = express()
const PORT = 8000;

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get("/", (req, res) => {
    return res.send("Hello World")
})

app.post("/signup", async (req, res) => {
    try {
        const body = req.body;

        const user = await User.findOne({
            email: body.email
        })

        if (user) {
            return res.status(400).json({
                message: "user already exists!"
            })
        }
        else {
            console.log("New User!")
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(body.password, salt);

        const newUser = await User.create({
            email: body.email,
            password: hash,
        })

        


        return res.json({
            message: "success"
        })
    }
    catch (error) {
        console.log("Error Occured!");
        console.log(error)
        return res.status(400).json({
            message: "Internal Server Error!"
        })
    }

})

app.post("/login",async(req,res)=>{
    try {

        const body = req.body;

        const user = await User.findOne({
            email: body.email
        })

        if(user.email != body.email){
            return res.status(400).json({
                message: "No user found with this email"
            })
        }

        const ans = await bcrypt.compare(body.password, user.password);

        if(!ans){
            return res.status(400).json({
                message: "Incorrect Password!"
            })
        }

        return res.json({
            message: "success"
        })


        
    } catch (error) {
        console.log("Error Occured!");
        console.log(error)
        return res.status(400).json({
            message: "Internal Server Error!"
        })
    }
})

//MAIN
async function main() {
    try {
        await dbConnection();
        app.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Unable to start the server!")
    }
}

main()



