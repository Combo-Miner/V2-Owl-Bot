const { Client, Message, MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const WomboDream = require('dream-api');
const fetch = require('node-fetch')
const db = require("quick.db")
module.exports = {
  name: 'gen',
  description: 'Permet de générer une image grace à une inteligence artificielle',
  helpname : "gen <mot-clé>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ez =db.get("gen" + message.guild.id)
  
    if(ez == true) return message.channel.send("Quelqu'un d'autre est **entrain de générer attendez qu'il finnisse**")
    const color = (db.get(`color_${message.guild.id}`) == null ? client.config.color : db.get(`color_${message.guild.id}`))
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member

   

    const GetStyle = await fetch('https://paint.api.wombo.ai/api/styles/').then(res => res.json())
    const style = GetStyle.map(style => {
      return {
        id: style.id,
        name: style.name,
      }
    })
   let embeds = new MessageEmbed()
   .setTitle("Aucun style trouvé les voici : ")
.setDescription(style.map(style => `\`${style.id}\` = \`${style.name} style\``).join('\n'))
    if(!args[0]) return message.channel.send({embeds : [embeds]})
    if(isNaN(args[0])) return message.channel.send(`Aucun nombre trouvé pour \`${args[0] == null ? "rien" : args[0] }\``)

    if(!args[1]) return message.channel.send("Merci de spécifié **quelque chose pour que l'inteligence le fasse**")

    message.channel.send("> **Création en cours..**")
    db.set("gen" + message.guild.id,true)

    let image = await WomboDream.generateImage(args[0], args[1]);

    let embed = new MessageEmbed()
      .setColor(color)
      .setFooter(`${member.user.username}`)
      .setImage(image.result.final)
      .setTitle(`${args[1]} `)
      .setTimestamp()

      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
        .setLabel('Télécharger')
        .setURL(image.result.final)
        .setStyle('LINK'),
  
  
        //Leave this in case user uses the image for some sort of thing and you can't get sued
        new Discord.MessageButton()
        .setLabel('TOS')
        .setURL("https://www.w.ai/terms-of-service-wombo-dream")
        .setStyle('LINK')
      )
    message.channel.send({ embeds: [embed], components: [row] })
    db.delete("gen" + message.guild.id)
  },
}