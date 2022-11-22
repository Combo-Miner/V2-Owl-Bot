const { Message, Client, MessageEmbed } = require("discord.js");
const ms = require('ms')
fs = require("fs");
const db = require("quick.db")
module.exports = {
    name: "unlock",
    helpname : "unlock [all/<salon>]",
    emoji: "🔓",
    desciption : "Permet de unlock un ou plusieurs salons",
    UserPerms : 'ADMINISTRATOR',
    /**
     *
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

    if(args[0] == "all") {
    message.guild.channels.cache.forEach(c=>  c.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: true
        }))
        message.channel.send("Tous les salons sont **unlock**")
        let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
        if(logs) {
            logs.send({embeds : [new MessageEmbed()
                .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                .setDescription(`${message.member.user.username} à **lock tous les salons**`)  .setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                
            
            ]})
            }
    }
   else  { 
    let time = args[1] || '30s'
    let Channel =  message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel 

    try {
        await Channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false
        });

        message.channel.send(` <#${Channel.id}> a bien était unlock !`)
        let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
        if(logs) {
            logs.send({embeds : [new MessageEmbed()
                .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                .setDescription(`${message.member.user.username} a **unlock ${Channel} **`)  .setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                
            
            ]})
            }
    } catch (err) {
        console.log(err);
    }

    setTimeout(() => {
        Channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: true
        }, ms(time))
    })
}
}

        }
    