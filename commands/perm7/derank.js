const db = require("quick.db");
const {Message,Client} = require("discord.js");
module.exports = {
  name: "derank",
  aliases: ["derank"],
  helpname : "derank <membre> ",
  emoji : "🎭",
description: "Permet de derank un utilisateur",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {   
    let member = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      (r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
    ) ||
    message.guild.members.cache.find(
      (ro) => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
    );
    if(!member) return message.channel.send(`Aucun utilisateur trouvé pour \`${args[0]}\``)
    if(member.roles.highest.position >= message.member.roles.highest.position || message.member.id !== client.config.ownerID || db.get(`owners_${client.user.id}_${message.member.id}`) !== true) return;
    let msg = await message.channel.send(`${member} a **été derank**`)
    member.roles.set([]).catch(e=> {
        return msg.edit("Je n'ai pas **les permissions requise pour derank** " + member.user.username)
    })
   

  }
}