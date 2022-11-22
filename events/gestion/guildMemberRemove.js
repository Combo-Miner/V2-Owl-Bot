const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")
const client = require("../../index")

client.on("interactionCreate", async (member)=> { 
 

    let leavedm = db.get(`leavedme_${member.guild.id}`)
    if (leavedm) member.send(leavedm
        .replace("{user}", member)
        .replace("{user:username}", member.username)
        .replace("{user:tag}", member.tag)
        .replace("{user:id}", member.id)
        .replace("{guild:name}", member.guild.name)
        .replace("{guild:member}", member.guild.memberCount)
    )

    

})