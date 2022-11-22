const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const client = require("../../index")
client.on("voiceStateUpdate",async  (oldState, newState) => {
const member  = oldState.member || newState.member
if(member.user.bot) return;
 const color = db.get(`color_${member.guild.id}`) === null? client.config.color:db.get(`color_${member.guild.id}`)

 let wass = db.get(`logvc_${member.guild.id}`);
if(oldState.channel == null) {
 const logschannel = member.guild.channels.cache.get(wass)
if(logschannel) logschannel.send({embeds : [new Discord.MessageEmbed()
 .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic : true }))
 .setColor(color)
 .setDescription(`**${member}** se connecte au salon ${newState.channel.name}`)

]})  
}

})