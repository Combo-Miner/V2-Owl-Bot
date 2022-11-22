
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db");
const warndb = require("../../models/users")
module.exports = {
  name: "clear-prevnames",
  description: 'Permet de supprimer tous ces anciens pseudo',
  run: async (client, message, args) => {
    let user = message.member
    if(!user) return;
warndb.findOne({
    User : user.id
}, async (err, data) => {
    if (err) throw err
    if (data) {
        data.delete()
        message.chanel.send("Tous vos anciens pseudo ont été supprimés")
    } else {
        message.chanel.send("Tous vos anciens pseudo ont été supprimés")
    }
})
}}