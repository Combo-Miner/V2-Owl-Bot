const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

const db = require("quick.db")

const random_string = require("randomstring")
module.exports = {
    name: 'warn',
    helpname : "warn <membre> ",
    UserPerms: ["ADMINISTRATOR"],
    description: "Permet de warn un utilisateur",
    emoji: '⚠️',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
     run: async (client, message, args, Discord) => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }   

         const use = message.mentions.users.first() || client.users.cache.get(args[1]) 
        let user = client.users.cache.get(use.id)

   //     if((await message.guild.members.fetch(user.id)).roles.highest.position >= message.member.roles.highest.position ) return;
      
        let res = args.slice(1).join(" ")
        if(!res) res = "Aucune raison" 
   
   let warnID = await
   random_string.generate({
       charset: 'numeric',
       length: 4
   });

   db.add(`number.${message.guild.id}.${user.id}`,1)
        db.push(`info.${message.guild.id}.${user.id}`, { id: warnID   ,type : "warn",moderator: message.author.tag, reason: res, date: Date.parse(new Date) / 1000 })

      
        message.channel.send(`${user.username} **à été warn** `)
        let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
        if(logs) {
            logs.send({embeds : [new MessageEmbed()
                .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                .setDescription(`${message.author.username} à warn ${user}`).setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                
            
            ]})
        }

    }
}