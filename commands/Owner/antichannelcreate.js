

const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    name: 'antichannelcreate',
    aliases : "antichannel",
    helpname : "antichannelcreate <on/off>",
    description: "Permet de activer ou désactiver la création des salons",
    emoji: `🤖`,
    BotPerms: "ADMINISTRATOR",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if (args[0] == "on") {
        db.set(`channelscreate_${message.guild.id}`, true);

        message.channel.send("Le module a été activé")
        let qs = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera des salon ?** (`ban`, `kick`, `derank`)")
        const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
        const CollectedWbSanc = responseWbSanc.first()
        const lowercases = CollectedWbSanc.content.toLowerCase()
        if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
            db.set(`channelscreatesanction_${message.guild.id}`, lowercases.replace("unrank", "derank"))
            message.channel.send(`Désormais quand quelqu'un **créera un salon** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
            qs.delete();
            CollectedWbSanc.delete()
            message.channel.send("Le module a été activé")
    
  
       
          } else {
            qs.delete();
            CollectedWbSanc.delete()
            return message.channel.send("C'est sois `ban`, `kick` ou `derank`")
        

      }
      }else if (args[0] == "off") {
        db.set(`channelscreate_${message.guild.id}`, null)
        message.channel.send("Le module a été désactivé")
      } 
      else{
        return message.channel.send("C'est sois `on` ou `off`")
      }
    }
} 
