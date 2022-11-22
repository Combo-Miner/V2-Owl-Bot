const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "allvcmute",
  aliases: ["vcmuteall"],
  helpname : "allvcmute",
  description: "Permet de mute tous les membres en vocal",
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
    
   
    let channel =
      message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "Veuillez mentionner un salon vocal ou **vous connecté dans le vocal.**"
      );
    channel.members
      .filter((x) => !x.permissions.has("ADMINISTRATOR"))
      .forEach((x, index) => {
        x.voice.setMute(true);
      });
    let em = new MessageEmbed()
    .setTitle(
      `Tous les membres  dans \`${channel.name}\`ont été mute.`
    )
    message.channel.send({embeds: [em]
    });
    let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
    if(logs) {
      logs.send({embeds : [new MessageEmbed()
          .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
          .setDescription(`${message.member.user.username} a **mute tout les utilisateur dans  ${channel} **`)
          .setColor(color)
          .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
          
          
      
      ]})
      }
  },
};