const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'invites',
    aliases: ["invite"],
    helpname : "invites",
    description : "Permet de voir son nombre d'invitations",
    run: async (client, message, args) => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }
    

        const use = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const member = client.users.cache.get(use.id)
            let inv = db.fetch(`invites_${message.guild.id}_${member.id}`);
            let leaves = db.fetch(`leaves_${message.guild.id}_${member.id}`);
            let Regular = db.fetch(`Regular_${message.guild.id}_${member.id}`);
            const embed = new Discord.MessageEmbed()
            embed.setAuthor(member.username, member.displayAvatarURL({ dynamic: true }))
            embed.setColor(color)
             embed.setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            embed.setDescription(`Vous avez actuellement **${inv || 0}** ${inv || 0 > 1 ? "invites" : "invite"}\n(**${Regular || 0}** join, **${leaves || 0}** leave)`)

            message.channel.send({embeds :[embed]});
      

    }
    }