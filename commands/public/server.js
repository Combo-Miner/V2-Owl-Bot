const Discord = require("discord.js");
const db = require('quick.db')
const config = require("../../config.json")

const {Message,Client,MessageEmbed} = require("discord.js")
module.exports = {
  name: 'server',
  helpname : "server <pic/info/banner>",
  description : "Permet de voir des informations concernant le serveur",
  aliases: [],
 /**
  * 
  * @param {Client} client 
  * @param {Message} message 
  * @param {String[]} args 
  */
  run: async (client, message, args) => {
    const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
    if(args[0] == "pic") {
        let guild = message.guild
        let embed = new MessageEmbed()
        .setTitle(message.guild.name)
        .setImage(message.guild.iconURL({size : 1024,dynamic : true}))
        .setColor(color)
        if (guild.icon) embed.setURL(guild.iconURL({ dynamic: true }))
        message.channel.send({embeds : [embed]})
    }else if(args[0] == "banner") {
        if(message.guild.banner) {
            let embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setImage(message.guild.bannerURL({dynamic : true,size : 2048}))
        .setColor(color)
        message.channel.send({embeds : [embed]})

        }
    } else if(args[0] == "info") {
        const guild = message.guild
        let Boosters = 0;
        guild.members.cache.forEach((m) => {
            if (m.premiumSince) i++;
        })

        let NoRoles = 0;
        guild.members.cache.forEach((m) => {
            if (m.roles.cache.size == 0) i++; 
        })
        //console.log(NoRoles)
        const ServerInfo = new Discord.MessageEmbed()
        .setTitle(`${guild.name} `)
        .setFooter("Serv crée le ")
        .addField(`Nombre de rôles :`, `${guild.roles.cache.size}`)
        .addField(`Nombre de salons :`, `${guild.channels.cache.size}`)
        .addField(`ID : `, `${guild.id}`)
        .addField(`Nombre de membres :`, `${guild.memberCount}`)
        .addField(`Nombre de membres actifs :`, `${guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'streaming' || m.presence?.status === 'idle').size}`)
        .addField(`Nombre d'humains :`, `${guild.members.cache.filter((m) => !m.user.bot).size}`)
        .addField(`Nombre de bots :`, `${guild.members.cache.filter((m) => m.user.bot).size}`)
        .addField(`Nombre d'utilisateurs en vocal :`, `${guild.members.cache.filter(m => m.voice.channel).size}`)
        .addField(`Nombre de boosts :`, `${guild.premiumSubscriptionCount}`)
        .addField(`Nombre de boosters :`, `${Boosters}`)
        .addField(`Nombre d'émojis :`, `${guild.emojis.cache.size}`)

        .setTimestamp(guild.createdAt)

        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setColor(color)

     if (guild.icon) ServerInfo.setURL(guild.iconURL({ dynamic: true }))
     message.channel.send({embeds : [ServerInfo]})

    }



  }


}