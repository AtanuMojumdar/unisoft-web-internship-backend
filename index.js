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
            return res.json({
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



