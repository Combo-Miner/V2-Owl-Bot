const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  helpname : "unban <id> ",
  description: "Permet de unban un utilisateur",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = client.config.prefix
    }  
   let user = client.users.fetch(args[0])
   if(!user) return;


    let bannedMember = user
    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sans raison!";

    message.guild.members
      .unban(bannedMember, reason)
      .catch((err) => console.log(err.toString().red))
    message.channel.send({content: `${(await bannedMember).username} vient de se faire unban`})
    let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
    if(logs) {
        logs.send({embeds : [new MessageEmbed()
            .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
            .setDescription(`${message.author.username}** à unban ${(await bannedMember).username}**`) .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            
        
        ]}).catch((err) => console.log(err.red));
    }
  },
};