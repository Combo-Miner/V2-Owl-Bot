const client = require("../../index");
const db = require("quick.db")
const config = require('../../config.json');
const { MessageEmbed } = require("discord.js");

client.on('messageCreate', async (message) =>{
        if(message.type.startsWith("USER_PREMIUM_GUILD_SUBSCRIPTION"))
     client.emit('guildMemberBoost',message.member);
    
})

    
      
    
    
 
