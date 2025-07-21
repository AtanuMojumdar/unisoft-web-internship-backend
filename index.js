//Imports
const express = require("express")
const dbConnection = require("./db/dbConnection.js")
const cors = require("cors")

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



