const client = require("../../index") 
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const config =client.config
client.on("guildDelete", async guild => {
  let own = db.all().filter(data => data.ID.startsWith(`owners_${client.user.id}`)).sort((a, b) => b.data - a.data) 
  own.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
    client.users.cache.get(m.ID.split('_')[2]).send(`Je viens de quitter ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.ownerId}>)`)
   })
  });