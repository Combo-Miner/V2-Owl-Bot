const { Message, MessageEmbed} = require("discord.js");
module.exports = {
  name: "invite",
  helpname : "invite <numéro>",
  description: "Permet de générer une invitation",
  category: "owner",
  emoji : "📨",
  ownerOnly: true,
  
  run: async(client, message, args) => { 


   const num = parseInt(args[0]) - 1

const Guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(x => x.id)

const GuildID = Guilds[num]

const myGuild = client.guilds.cache.get(GuildID)
 const id = myGuild.channels.cache.filter(e => e.isText()).first() 
  const invite = id.createInvite()
  .then(invite => message.channel.send('https://discord.gg/' + invite.code))
  .catch (console.error)
    
    


  }
  }