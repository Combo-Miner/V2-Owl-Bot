const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")



module.exports = {
    name: 'antikick',
    helpname : "antikick <on/off>",
    description: "*Permet de activer ou désactiver l'antikick*",
    ownerOnly : true,
    BotPerms: "ADMINISTRATOR",
    emoji: `🤖`,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
      if (args[0] == "on") {
        db.set(`massban_${message.guild.id}`, true);

        message.channel.send("Le module a été activé")
        let q = await message.channel.send("Combien de fois **on dois bannir des membres pour que je punissent ?**")
                                const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                const CollectedWbSanc = responseWbSanc.first()
                                const lowercase = CollectedWbSanc.content.toLowerCase()
                                if (isNaN(lowercase)) {
                                    q.delete()
                                    message.channel.send("Ceci n'est pas un nombre")

                                } else {
                                    let q2 = await message.channel.send(`En combien **de temps on dois faire ${lowercase} ban pour être punie ?**`)
                                    const responseWbSanc2 = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                    const CollectedWbSanc2 = responseWbSanc2.first()
                                    const lowercase2 = CollectedWbSanc2.content.toLowerCase()
                                    if (!ms(lowercase2.replace("j", "d"))) {
                                        return message.channel.send(`Temps incorrect.`)

                                    } else {
                                        q.delete()
                                        q2.delete()
                                        db.set(`massbannum_${message.guild.id}`, lowercase)
                                        db.set(`massbantime_${message.guild.id}`, lowercase2)
                                        message.channel.send(`Dès mainteanant si une personne fera **${lowercase}** **Bannissement** en moins de **${lowercase2}\`** se fera punir !`)
                                        
                                    }
                                }
                                let qs = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un bannira un membre ?** (`ban`, `kick`, `derank`)")
                                const responseWbSancs = await message.channel.awaitMessages( { filter : m => m.author.id === message.author.id,max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                const CollectedWbSancs = responseWbSancs.first()
                                const lowercases = CollectedWbSancs.content.toLowerCase()
                                if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
                                    db.set(`massbansanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                    message.channel.send(`Désormais quand quelqu'un **bannira un membre** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                    
                                    qs.delete();
                                    CollectedWbSancs.delete()


                                } else {
                                    qs.delete();
                                    CollectedWbSancs.delete()
                                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` ")
                                }

    } else if (args[0] == "off") {
        db.set(`massban_${message.guild.id}`, null);
        message.channel.send("Le module a été desactivé")


    } else {
    
        return message.channel.send("C'est sois `on` ou `off` ")

    }
        }
}
