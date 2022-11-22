const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const client = require("../../index")

client.on("messageUpdate", async (oldMessage,newMessage) => {
   if(oldMessage.member.user.bot ||newMessage.member.user.bot) return;
   if(oldMessage.embeds) return;
    let guild = oldMessage.guild
   const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)

    let wass = db.get(`msglog_${oldMessage.guild.id}`);
  
    const logschannel = oldMessage.guild.channels.cache.get(wass)
  
    if(logschannel) logschannel.send({embeds : [new Discord.MessageEmbed()
    .setColor(color)
    .setAuthor(`${oldMessage.author.username}` , `${oldMessage.author.displayAvatarURL({dynamic : true })}`)
    .setDescription(`**Message édité dans** <#${oldMessage.channel.id}>` )
    .addField(`Avant` , `${oldMessage.content}`)
    .addField(`Aprés` , `${newMessage.content}`)
    .setTimestamp()]})
})