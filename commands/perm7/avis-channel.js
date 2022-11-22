const { Client, Message, MessageEmbed } = require("discord.js");
let db = require("quick.db")

module.exports = {
  name: "avis-channel",
  helpname : "avis-channel <salon>",
  description: "Permet de configuré le salon d'avis",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => { 
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(!channel) return message.channel.send(`Aucun salon trouvé pour \`${args[0] == null ? "rien" : args[0]}\``)
   await  db.set("avischannel" + message.guild.id,channel.id)
    await message.channel.send(`Le salon d'avis **est maintenant <#${channel.id}>**`)

  }
}