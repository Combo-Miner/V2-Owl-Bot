const { Schema, model } = require("mongoose")

module.exports = model('username',
    new Schema({
        User: String,
        content : Array ,
    })
)