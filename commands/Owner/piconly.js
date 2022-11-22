const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms")
module.exports = {
    name: 'piconly',
    helpname : "piconly <set/reset/check> <salon>",
    description : "Permet de configurer le salon de piconly",
    aliases: [],
    ownerOnly : true,
    run: async (client, message, args) => {

        if (args[0] == "set") {
            let channel = message.mentions.channels.first() || client.cache.channels.args[1]
            if (!channel) return;
            db.set("pp" + message.guild.id, true)
            db.set("piconly" + message.guild.id, channel.id)
            message.channel.send(`${channel} est **maintenant le salon de pp**`)
        } else if (args[0] == "reset") {
            db.delete("piconly" + message.guild.id)
            db.delete("pp" + message.guild.id)
            message.channel.send("Le salon de **pp à été reset**")
        } else if (args[0] == "check") {
            let link = db.get('pp' + message.guild.id)
            if (link) {
                message.channel.send(`Le salon de pp est <#${link}>`)
            } else {
                return message.channel.send("Aucune **configuration pour le moment**")
            }
        }


    }
}