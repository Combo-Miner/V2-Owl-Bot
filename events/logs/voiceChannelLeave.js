const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const client = require("../../index")


client.on("voiceStateUpdate",async (oldState, newState) => {
    const member = oldState.member || newState.member
    if(member.user.bot) return;
   const color = db.get(`color_${member.guild.id}`) === null? client.config.color:db.get(`color_${member.guild.id}`)
   const channel  = oldState.channel
  

        let wass = db.get(`logvc_${member.guild.id}`);
        const logschannel = member.guild.channels.cache.get(wass)
        if(newState.channel === null) {
        if(!oldState.channel) return;
        if(logschannel) logschannel.send({embeds : [new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic : true }))
        .setColor(color)
        .setDescription(`**${member}** quitte le salon ${channel.name}`)
        ]})
 
    }
})

  