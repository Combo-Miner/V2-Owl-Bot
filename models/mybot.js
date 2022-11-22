const { Schema, model } = require("mongoose")

module.exports = model('mybotsss',
    new Schema({
        User: String,
        content: Array ,
        BotId : String,
    })
)