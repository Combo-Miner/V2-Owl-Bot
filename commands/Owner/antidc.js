

const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")
const ms = require("ms")

module.exports = {
    name: 'antidc',
    aliases : "antidc",

    helpname : "antidc <on/off>",
    description: "Permet de activer ou désactiver la protection contre les faux comptes",
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
            db.set(`crealimit_${message.guild.id}`, true);
          
            message.channel.send("Le module a été activé")
       
             let qs = await message.channel.send("Quel est **la nouvelle limite de création de compte ?** (en jours) ")
                               const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                               const CollectedWbSanc = responseWbSanc.first()
                               const lowercase = CollectedWbSanc.content.toLowerCase()
                               if (!ms(lowercase.replace("j", "d"))) {
                                   qs.delete()
                                   message.channel.send("Temps incorect")


                               } else {
                                   qs.delete()
                                   db.set(`crealimittemps_${message.guild.id}`, lowercase.replace("j", "d"))
                                   message.channel.send(`Les membres ne pourront pas rejoindre si leur compte a été créé il y a moins de **${lowercase}** !`)
                               }

        } else if (args[0] == "off") {
            db.set(`crealimit_${message.guild.id}`, null);
         
            message.channel.send("Le module a été desactivé")
           


        } else {
        
            return message.channel.send("C'est sois `on` ou `off` .")

        }
    }
  }