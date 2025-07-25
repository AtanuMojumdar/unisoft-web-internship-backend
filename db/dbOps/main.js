const User = require("../models/UserSchema.js")


async function deleteUser() {
    await User.deleteOne({
        email: "abc@gmail.com"
    })
}

async function UpdateUser() {
    await User.updateOne({
        email: "abc@gmail.com"
    },{
        password: 1234
    })
}

module.exports = deleteUser;