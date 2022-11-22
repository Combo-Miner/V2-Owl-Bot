const { Client, Message, MessageEmbed } = require("discord.js");
let db = require("quick.db");

module.exports = {
  name: "avis",
  helpname: "avis <avis>",
  description: "Permet de mettre un avis pour le serveur",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => { 
    const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
    let channel = client.channels.cache.get(db.get('avischannel' + message.guild.id))
    if(channel == undefined || channel == null) return message.channel.send("Le salon d'avis n'est pas configuré sur ce serveur ")
    
    let filter2 = (m) => m.author.id == message.author.id
    let étoile = 1
    let question5 = await message.channel.send(`Combien d'étoiles donnez-vous ? (1-5)`)
    let durerecup = await message.channel.awaitMessages({
      filter: filter2,
      max: 1,
      time: 60000
    })
    var msg = parseInt(durerecup.first())
    if(isNaN(msg)) return message.channel.send("Chiffre incorect (1-5) ")
    let after = msg * étoile
    if(after > 5) return message.channel.send("Nombre invalide (1-5)")
    if(after <=0) return message.channel.send("Nombre invalide (1-5) ")
    let avis = await message.channel.send("Quel est votre avis ?")
    let avisrecup = await message.channel.awaitMessages({
        filter: filter2,
        max:1,
        time : 60000
    })
    let avispro = avisrecup.first().toString()
    avis.delete()

    message.guild.ownerId
    await  message.channel.send(`Vous avez donné \`${after}\` étoiles avec comme avis \`${avispro}\``).then(() => {
        channel.send({embeds : [new MessageEmbed()
            .setAuthor({name : message.member.user.username,iconURL : message.author.displayAvatarURL() })
            .setDescription(`${"⭐".repeat(after)}`)
            .addFields({
            name : "Avis",value : avispro
        }).setFooter({text : message.guild.name, iconURL : message.guild.iconURL()})
    .setTimestamp().setColor(color)]})
    })
    }
}