const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "addrole",
  helpname : "addrole <membre> ",
description: "Ajoute un rôle à un utilisateur",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {  
    let rMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
   
    if (!rMember) return message.channel.send(`Aucun membre trouvé pour \`${args[0] == null ? "rien" : args[0]}\` `)
  

    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find(
        (rp) =>
          rp.name.toLowerCase() === args.slice(1).join(" ").toLocaleLowerCase()
      );

    if (!role)
    return message.channel.send(`Aucun rôle trouvé pour \`${args[1] == null ? "rien" : args[1]}\` `)

    if (role.managed)
      return message.channel.send({content : "Je ne peux pas gérer ce **rôle**"}

      );
 
    if (message.guild.me.roles.highest.comparePositionTo(role) <= 0)
    return message.channel.send({content : "Je ne peux pas gérer ce **rôle**"}
        
      );
    const alreadyhas = new MessageEmbed()
    .setColor("RED")
    .setAuthor(message.author.tag)
    .setDescription(
      "**Cet utilisateur à déja le rôle**")
    if (rMember.roles.cache.has(role.id))
      return message.channel.send({content :  rMember.user.username  + " possédes déjà ce **rôle**"}
          )
    if(rMember.roles.highest.position >= message.member.roles.highest.position || message.member.id !== message.guild.ownerId || db.get(`owners_${client.user.id}_${message.member.id}`) !== true) 
      return console.log("Rien")
    if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
  

    message.channel.send({content : `${rMember.user.username} à reçu le rôle ${role.name}`});
    let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
    if(logs) {
      logs.send({embeds : [new MessageEmbed()
          .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
          .setDescription(`${message.member.user.username} a **donner le rôle  ${role.name} à  ${rMember} ** avec le bot`)
          
      
      ]})
      }



  
  },
};