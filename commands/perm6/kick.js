
const { client, MessageEmbed, Message,Client } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: 'kick',
    helpname : "kick <membre>",
    description : "Permet de kick un utilisateur",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
  
    run : async(client, message, args) => { 
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }  
        let user = message.mentions.members.first() 
        if(!user) return;
        let reason =  args.slice(1).join(" ");
        if(!reason) reason = 'Sans Raison'

        if(message.member.roles.highest.position <= user.roles.highest.position) return;
        if(user.kickable){
            user.kick({reason : reason})
            message.channel.send(`${user.user.username} vien de se faire kick`)
            const  random_string = require("randomstring")
            let warnID = await
            random_string.generate({
                charset: 'numeric',
                length: 4
            });
            
            db.add(`number.${message.guild.id}.${user.id}`,1)
            db.push(`info.${message.guild.id}.${user.id}`, { id: warnID   ,type : "expulsion",moderator: message.author.tag, reason: res, date: Date.parse(new Date) / 1000 })
            let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
            if(logs) {
              logs.send({embeds : [new MessageEmbed()
                  .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                  .setDescription(`${message.member.user.username} a **kick ${user} : ${reason} **`)  .setColor(color)
        .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                  
              
              ]})
              }
        } else {
            return message.channel.send(`Assure-toi que mon **rôle** est assez haut`)
        }

    }
}