const { Message, Client, MessageEmbed, Channel } = require("discord.js");
const ms = require('ms')
fs = require("fs");
const db = require("quick.db")
module.exports = {
    name: "lock",
    helpname : "lock [all/<salon>] ",
    description: "Permet de lock un ou plusieurs salons",
    emoji: "🔒",
    /**
     *
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
    
      let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
      if(args[0] == "all") {
      message.guild.channels.cache.forEach(c=> c.permissionOverwrites.edit(message.guild.id,{
          SEND_MESSAGES: false
        }))
        message.channel.send("Tous les **salons** sont lock")
        if(logs) {
          logs.send({embeds : [new MessageEmbed()
              .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
              .setDescription(`${message.member.user.username} a **lock tous les salons **`) .setColor(color)
              .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
              
          
          ]})
          }
      }else  { 
   let channel =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel 
    channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
    SEND_MESSAGES: false
}).catch((e) => { console.error(e) })
    await message.channel.send(`🔒 ${channel} a été **lock**`)
    
    if(logs) {
      logs.send({embeds : [new MessageEmbed()
          .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
          .setDescription(`${message.member.user.username} a **lock ${channel} **`) .setColor(color)
          .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
          
      
      ]})
      }
  }
}
};
    