const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')


module.exports = {
    name: 'unmute',
    helpname : "unmute [all/<membre>]",
    description: "Permet de unmute un ou plusieurs utilisateurs",
    emoji: '🔊',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
            const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) {
        prefix = client.config.prefix
    }  
      try {
        if(args[0] == "all") {
            let role = message.guild.roles.cache.find(r => r.name == "Muted")
            if(!role) return message.channel.send("Role `Muted` introuvable")
            let users = message.guild.members.cache.filter(u => u.roles.cache.has(role))
           users.forEach(u=>  u.roles.remove(role.id))
        
      
            await message.channel.send("Tous les utilisateurs **vient d'être unmute** ")
            let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
            if(logs) {
                logs.send({embeds : [new MessageEmbed()
                    .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                    .setDescription(`${message.author.username} **à unmute tout le monde**`)  .setColor(color)
                    .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                    
                
                ]})
            }
        }
        else if (!args[0]) { 

        const member = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.name === 'Muted')

                if (!role) return message.channel.send({ content : "Je n'ai pas pu trouvé le rôle `Muted`"})

                if (!member.roles.cache.has(role.id)) return message.channel.send({ content : `**${member.user.username}** n'est pas mute` })

                    await member.roles.remove(role)

                  

                    message.channel.send({content : `**${member.user.username}** a retrouvé la parole`})
                    if(logs) {
                        logs.send({embeds : [new MessageEmbed()
                            .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                            .setDescription(`${message.author.username} a **redonné la permissions de parler à ${member} **`)  .setColor(color)
                            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                            
                        
                        ]})
                    }

                   // console.log(`${i.user.tag} (${i.user.id}) à unmute  ${member.user.tag} (${member.user.id}) dans ${i.guild.name} (${i.guild.id})`)


               

          

            }

  

    } catch (err) {

        const errEmbed = new MessageEmbed()
            .setColor('#3d35cc')
            .setDescription("‼️ - Une erreur s'est produite lors de l'exécution de la commande, veuillez réessayer plus tard !")

       message.reply({ embeds: [errEmbed] })

    

    }

}
};