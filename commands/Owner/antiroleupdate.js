


const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")
module.exports = {
    name: 'antiroleupdate',
    aliases : "antiroleupdate",
    helpname :"antiroleupdate <on/off>",
    description: "Permet de activer ou désactiver la modification de rôles",
    ownerOnly : true,
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
        db.set(`rolesmod_${message.guild.id}`, true);
      
        message.channel.send("Le module a été activé")
        let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un modifira un rôle ?** (`ban`, `kick`, `derank`)")
        const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
        const CollectedWbSanc = responseWbSanc.first()
        const lowercases = CollectedWbSanc.content.toLowerCase()
        if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
            db.set(`rolesmodsanction_${message.guild.id}`, lowercases.replace("unrank", "derank"))
            message.channel.send(`Désormais quand quelqu'un **modifira un rôle** il se fera \`${lowercases.replace("unrank", "derank")}\` `)

            q.delete();
            CollectedWbSanc.delete()


        } else {
            q.delete();
            CollectedWbSanc.delete()
            return message.channel.send("C'est sois `ban`, `kick` ou `derank` ")
        }


    } else if (lowercase == "non") {
        db.set(`rolesmod_${message.guild.id}`, null);
   
        message.channel.send("Le module a été desactivé")
    


    } else {
  
        return message.channel.send("C'est sois `on` ou `off` ")

    }
  }
        
}
