
const { MessageEmbed, Message,Client } = require('discord.js')

const dbs = require("quick.db")

module.exports = {
    name: 'del',
    helpname : "del sanction <membre> <nombre>",
    description : "Permet de supprimer une sanction",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
  
    run : async(client, message, args) => {
     
if(args[0] == "sanction") { 
    const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = client.config.prefix
    }
   
 let user = message.mentions.members.first() 
 user = user.user
 if (!user) return;
 const database= dbs.get(`info.${message.guild.id}.${user.id}`)
if(database) { 
         let number = parseInt(args[2]) 
         if(!number) return message.channel.send(`Aucun nombre trouvé pour \`${number}\``)
       
       

        database.splice(database.findIndex(data => data.id == number), 1)
        if (database.length >= 1) {
            //dbs.subtract(`number.${message.guild.id}.${user.id}`, 1)
            dbs.subtract(`number.${message.guild.id}.${user.id}`,1)
            dbs.set(`info.${message.guild.id}.${user.id}`, database)
        } else {
            dbs.delete(`number.${message.guild.id}.${user.id}`)
            dbs.delete(`info.${message.guild.id}.${user.id}`)

        }


       
         message.channel.send({embeds : [new MessageEmbed() .setColor(color)
            .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`).setDescription('La sanction à été **supprimé** ')]})
         let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
         if(logs) {
           logs.send({embeds : [new MessageEmbed()
               .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
               .setDescription(`${message.member.user.username} a **retirer la sanction ${number} de ${user} ** avec le bot`) .setColor(color)
               .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
               
           
           ]})
           }
         
     } else {
        message.channel.send({embeds : [ new MessageEmbed().setAuthor({ name: user.username, iconURL: user.displayAvatarURL() }).setColor().setTitle("N'a reçu aucune sanction")]})
     }
 
}

}
}