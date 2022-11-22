const client = require("../../index");
const { MessageEmbed, Message } = require("discord.js");
const config = client.config
const db = require("quick.db")


client.on('guildCreate', async guild => {
  let own = db.all().filter(data => data.ID.startsWith(`owners_${client.user.id}`)).sort((a, b) => b.data - a.data) 
 own.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
   client.users.cache.get(m.ID.split('_')[2]).send(`Je viens de rejoindre \`${guild.name}\` (\`${guild.memberCount}\` membres, propriétaire : <@${guild.ownerId}>)`)
  })
 
  });