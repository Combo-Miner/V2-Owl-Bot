
const { client, MessageEmbed, Message,Client } = require('discord.js')


module.exports = {
    name: 'find',
    description : "Permet de trouver un utilisateur en voc",
    helpname : "find <membre>",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
  
    run : async(client, message, args) => {
        let user = message.mentions.members.first()
        let voc = user.voice.channelId
        if(!voc) return message.channel.send(` <@${user.id}> n'est pas en voc `)
        message.channel.send(`<@${user.id}> est dans <#${voc}>`)

     }
}