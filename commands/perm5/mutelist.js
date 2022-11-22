const { client, MessageEmbed, Message,Client } = require('discord.js')


module.exports = {
    name: 'mutelist',
    helpname :"mutelist",


    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
  
    run : async(client, message, args) => { 
        let roles = message.guild.roles.cache.find(r => r.name == "Muted")
        let user = message.guild.members.cache.filter(u => u.roles.cache.has(roles))
        if(!user)  return message.channel.send("Aucun membres est **mute**")
        const embed = new MessageEmbed()
        .setTitle("MuteList")
        .setDescription(user.map((u,i) => `\`${i++}\` ${u.username} `).join(`\n`))

    }
}