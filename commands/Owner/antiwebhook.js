const { Client, CommandInteraction, MessageEmbed } = require('discord.js')
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    name: "antiwebhook",
    helpname : "antiwebook <on/off>",
    description: "Active ou désactive l'antiwebhook",
   BotPerms : "ADMINISTRATOR",
    /** 
    * @param {Client} client 
    * @param {String[]} args 
    *  @param {Message} message
    */
    run: async(client,message, args) => {

        
        if (args[0] == "on") {
            db.set(`webhook_${message.guild.id}`, true);
         
            message.channel.send("Le module a été activé")
            let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera un webhook ?** (`ban`, `kick`, `derank`)")
            const responseWbSanc = await message.channel.awaitMessages( { filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbSanc = responseWbSanc.first()
            const lowercase = CollectedWbSanc.content.toLowerCase()
            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                db.set(`webhooksanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                message.channel.send(`Désormais quand quelqu'un **créera un webhook** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
             
                q.delete();
                CollectedWbSanc.delete()


            } else {
                q.delete();
                CollectedWbSanc.delete()
                return message.channel.send("C'est sois `ban`, `kick` ou `derank`")
            }

        } else if (lowercase == "non") {
            db.set(`webhook_${message.guild.id}`, null);
          
            message.channel.send("Le module a été desactivé")
           


        } else {
            return message.channel.send("C'est sois `on` ou `off` ")

        }
         }
      
      
    }