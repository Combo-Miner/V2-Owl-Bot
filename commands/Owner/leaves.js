const { Message,Client, MessageEmbed} = require("discord.js");
module.exports = {
  name: "leaves",
  helpname : "leaves <numéro>",
  description: "Permet de me faire quitter un serveur",

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(client, message, args) => { 


   const num = parseInt(args[0]) - 1

const Guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(x => x.id)

const GuildID = Guilds[num]
if(!GuildID) return message.channel.send(`Aucun serveur trouvé pour ${num == null ? "rien" : num - 1} `)

const myGuild = client.guilds.cache.get(GuildID)
myGuild.leave()
message.channel.send(`Je viens de quitter ${myGuild.name} `)

 
    
    


  }
  }