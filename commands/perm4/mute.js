const { Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    Integration
} = require("discord.js");
const ms = require('ms')
const db = require("quick.db")

// #fcbd8f
module.exports = {
    name: "mute",
    emoji: "🔇",
    helpname : "mute <membre>",
    description: "Permet de mute un utilisateur",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args,Discord) => {
        try { 
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sans raison";
    const member = message.mentions.members.first()
    if(member.permissions.has("ADMINISTRATOR")) return message.channel.send("Tu ne peux pas mute un **Administrateur**")
    const role = message.guild.roles.cache.find(role => role.name === 'Muted')


    if (member.id === message.author.id) {
      return  message.reply(
        ` Tu ne peux pas te **mute**`
      );
    }

    
        if (!role) {

            const noroleerrEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription('‼️ - Le rôle MUTE  est introuvable , en cours de création!')

         let msg =   message.channel.send({content : "Rôle introuvable,creation en cours.."})
         let i = message
            let role = await i.guild.roles.create({ name: "Muted" }).catch(err => console.log(err))
            i.guild.channels.cache.map((x) => {
                if (!x.isThread()) {
                    x.permissionOverwrites.edit(
                        role,
                        {
                            MANAGE_WEBHOOKS: false,
                            SEND_MESSAGES: false,
                            USE_PUBLIC_THREADS: false,
                            USE_PRIVATE_THREADS: false,
                            ADD_REACTIONS: false,
                            ATTACH_FILES: false,
                            SEND_TTS_MESSAGES: false,
                            MANAGE_THREADS: false,
                            MANAGE_MESSAGES: false,
                            MENTION_EVERYONE: false,
                            CONNECT: false,
                            SPEAK: false,
                        },
                        reason,
                    ).catch(err => console.log(err))
                }
            })

           

            message.channel.send({content : "Le rôle \`Muted\` vient d'être crée" })

        }
           let i = message
        let role2 = i.guild.roles.cache.find(r => r.name === 'Muted')
        console.log(role2)

      

        if (member.roles.cache.has(role2.id)) return message.channel.send({ content :`**${member.user.username}**  est déjà mute`  })

        await member.roles.add(role2.id)
    

        const  random_string = require("randomstring")
   let    user = member 
        let res = reason 
   
   let warnID = await
   random_string.generate({
       charset: 'numeric',
       length: 4
   });
   
   db.add(`number.${message.guild.id}.${user.id}`,1)
   db.push(`info.${message.guild.id}.${user.id}`, { id: warnID   ,type : "mute",moderator: message.author.tag, reason: res, date: Date.parse(new Date) / 1000 })



       message.channel.send({content : `${member.user.username} est mainteanant **mute**` })
       let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
       const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
       let prefix = db.get(`prefix_${message.guild.id}`)
       if(!prefix) {
           prefix = client.config.prefix
       } 
       if(logs) {
           logs.send({embeds : [new MessageEmbed()
               .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
               .setDescription(`${message.author.username}  **retirer la permissions de parler à  ${user}**`).setColor(color)
               .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
               
           
           ]})
           }
      
 

} catch (err) {

    const errEmbed = new Discord.MessageEmbed()
        .setColor('#3d35cc')
        .setDescription("‼️ - Une erreur s'est produite lors de l'exécution de la commande, veuillez réessayer plus tard !")

    message.channel.send({ embeds: [errEmbed] })

    return console.log(err)

}

}

      }
  