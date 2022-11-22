const { MessageEmbed,Message,Client } = require('discord.js')

const color = 'BLUE'
const db = require("quick.db")
const moment = require("moment")

module.exports = {
            name: 'userinfo',
            helpname : "userinfo <membre> ",
            description: 'Permet de voir des informations sur un utilisateur',
            
 /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
        
    
    run: async(client, message,args)  => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            if(!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] == null ? 'rien' : args[0]}\` `)
             let user = member
            let statut = member.presence?.status;
            const roles = member.roles.cache
            .filter((x) => x.id !== message.guild.id && !x.managed)
            .sort((a, b) => b.position - a.position)
            .map((x) => x.toString());
            let ez = ""
            if(statut === "online") {
                ez = "🟢 En ligne"
            }else if (statut === "idle") {
                ez = "🌙 Inactif"
            }else if(statut == "dnd") {
                ez = "⛔ Ne pas déranger"
            }else {
                ez = '⚪ Hors ligne'
            }
            const embed = new MessageEmbed()
            .setDescription(`Informations sur ${member.user.username}`)
            .setColor(color)
            .addFields({name : "Pseudo",  value : member.user.username + member.user.discriminator },
            {name: "ID :",value : user.id },
            {name: "Statut :", value : ez},
            {name : "Compte crée le :", value : moment(member.user.createdAt).locale('fr').format('dddd Do MMM YYYY')},
            {name : "A rejoint le serveur le :",value : moment(member.user.joinedAt).locale("fr").format('dddd Do MMM YYYY')},
            {name : 'Rôles', value : 
                roles.length < 10
                  ? roles.join(" ")
                  : roles.length > 10
                  ? roles.join("") 
                  : "Aucun rôle"
              })
            message.channel.send({embeds : [embed]})

    }
}