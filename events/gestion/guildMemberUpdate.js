const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const client = require("../../index")

client.on("guildMemberUpdate", async (oldMember,newMember)=> {
    const oldStatus = oldMember
    const newStatus = newMember
    const member =     newMember || oldMember
    let  loogs =  client.channels.cache.get(db.get(`boost_${member.guild.id}`))
    if(oldStatus &&  !newStatus) {
        if(loogs){
            return loogs.send({embeds : [new MessageEmbed().setDescription(`${member} a deboost le serveur`).setColor("#ff007f")]})
         }
    }
 


    

})