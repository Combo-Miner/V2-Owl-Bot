const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton, MessageFlags } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "tickets",
  helpname : "tickets <add/remove> <membre>",
  emoji: "🎭",
  description: "Permet de configurer les paramètres de tickets",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = client.config.prefix
    }

    if (args[0] == "add") { 
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!member) return message.channel.send(`Aucun membre trouvé pour \`${args[1] == null ?  "rien" : args[1]}\``)
        message.channel.permissionOverwrites.edit(member.id,{VIEW_CHANNEL : true,SEND_MESSAGES : true})


    } 
    if(args[0] == "remove") {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!member) return message.channel.send(`Aucun membre trouvé pour \`${args[1] == null ? "rien" : args[1]}\``)
        message.channel.permissionOverwrites.edit(member.id,{VIEW_CHANNEL : false,SEND_MESSAGES : false})

    }
}
}