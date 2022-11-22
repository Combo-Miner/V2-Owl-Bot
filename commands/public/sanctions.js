const { MessageEmbed,Message,Client } = require('discord.js')

const color = 'BLUE'
const db = require("quick.db")

module.exports = {
            name: 'sanctions',
            helpname : "sanctions <membre> ",
            description: 'Permet de voir les sanctions',
            UserPerms: ['ADMINISTRATOR'],
            
 /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
        
    
    run: async(client, message,args)  => {

        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }  
        let user = message.mentions.users.first()  || message.author
        const number = db.fetch(`number.${message.guild.id}.${user.id}`)
        const data = db.fetch(`info.${message.guild.id}.${user.id}`)
        console.log(data)
            if (data) {
              let e = data.map(r => r)
                .map((m, i) => `${m.id}・Type :  \`${m.type}\`Modérateur: ${m.moderator} Raison: ${m.reason} Date: <t:${m.date}>`)
                const embed = new MessageEmbed().setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                    .setDescription(e.join("\n"))
                message.channel.send({
                    embeds: [embed]
                })
            } else {
                message.channel.send({embeds : [ new MessageEmbed().setColor(color)
                    .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`).setAuthor({ name: user.username, iconURL: user.displayAvatarURL() }).setTitle("N'a reçu aucune sanction")]})
            }
        
       
    

    }
} 
        

  