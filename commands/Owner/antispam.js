const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    name: "antispam",
    description: "Active ou désactive l'antispam",
    helpname : "antispam <on/off>",
   ownerOnly : true,
   BotPerms : "ADMINISTRATOR",
    /** 
    * @param {Client} client 
    * @param {String[]} args 
    *  @param {Message} message
    */
    run: async(client,message, args) => {

        if (!args.length) {
            return message.channel.send(`Attention, vous avez mal utiliser la commande, \`antispam <on/off>\``)
              }
        if (args[0] == 'off') {
       let link = db.get(`antispam_${message.guild.id}`)
       if(link == true ) { 
        db.delete(`antispam_${message.guild.id}`)
        message.channel.send(`${message.author.username} a **désactivé l'antispam **`)
        } else {
             message.channel.send(`L'antispam est **déjà désactivé**`)
        }
    }
       if (args[0] == 'on') {
        let link = db.get(`antispam_${message.guild.id}`)
         if(link == true ) {
            const onembed = new MessageEmbed()
            .setTitle(`**ANTISPAM ON**`)
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
            .setDescription(`**L'antispam est déjà activé`)
             message.channel.send(`L'antispam est **déjà activé**`)
            }
            else { 
                db.set(`antispam_${message.guild.id}`, true)
                const onembed = new MessageEmbed()
                .setTitle(`**ANTISPAM ON**`)
                .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
                .setDescription(`**${message.author.username} ** à activé l'antispam`)
                 message.channel.send(`${message.author.username} a **activé l'antispam**`)
                }
            }
         }
      
      
    }