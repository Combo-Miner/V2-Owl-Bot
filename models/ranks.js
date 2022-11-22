const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild: String,
     Rank: String,
     Role: String,
})

module.exports = mongoose.model('ranks',Schema)