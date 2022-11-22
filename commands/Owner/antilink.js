const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")
module.exports = {
    name: 'antilink',
    helpname : "antilink <on/off>",
    description: "*Permet de activer ou désactiver l'antilien*",
    emoji: `🤖`,
    BotPerms: "ADMINISTRATOR",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


      if (lowercase == "oui") {
        db.set(`link_${message.guild.id}`, true);
      
        message.channel.send("Le module a été activé")
    } else if (args[0] == "off") {
        db.set(`link_${message.guild.id}`, null);
        message.channel.send("Le module a été desactivé")
       


    } else {
        
        return message.channel.send("C'est sois `on` ou `off`")

    }
        }
}
