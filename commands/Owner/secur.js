const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")
const ms  = require("ms")
function onoff(antiraid) {
      if (antiraid === null) return "Aucun"
      if (antiraid === true) return "✅"
    
    }
module.exports = {
      name: 'secur',
      description: "Permet de configurer/voir la sécurité du serveur ",
      helpname : "secur <on/max/off>",
      BotPerms: "ADMINISTRATOR",
      /**
       *
       * @param {Client} client
       * @param {Message} message
       * @param {String[]} args
       */
      run: async (client, message, args) => {
            const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
            let prefix = db.get(`prefix_${message.guild.id}`)
            if(!prefix) {
                prefix = client.config.prefix
            }
         
            async function on() {
                  message.channel.send("Activation en cours (cela peut prendre plusieurs minutes)").then((msggg) => {
                      db.set(`massban_${message.guild.id}`, true);
                      db.set(`massbansanction_${message.guild.id}`, "derank")
                      db.set(`massbanwl_${message.guild.id}`, true)
                      db.set(`link_${message.guild.id}`, true);
                      db.set(`webhook_${message.guild.id}`, true)
                      db.set(`webhooksanction_${message.guild.id}`, "derank")
                      db.set(`webhookwl_${message.guild.id}`, true)
              
                      db.set(`rolescreate_${message.guild.id}`, true);
                      db.set(`rolescreatesanction_${message.guild.id}`, "derank")
                      db.set(`rolescreatewl_${message.guild.id}`, null)
              
                      db.set(`rolesdel_${message.guild.id}`, true);
                      db.set(`rolesdelsanction_${message.guild.id}`, "derank")
                      db.set(`rolesdelwl_${message.guild.id}`, null)
              
                      db.set(`rolesmod_${message.guild.id}`, true);
                      db.set(`rolesmodsanction_${message.guild.id}`, "derank")
                      db.set(`rolesmodwl_${message.guild.id}`, null)
              
                      db.set(`rolesadd_${message.guild.id}`, true);
                      db.set(`rolesaddsanction_${message.guild.id}`, "derank")
                      db.set(`rolesaddwl_${message.guild.id}`, null)
              
                      db.set(`channelscreate_${message.guild.id}`, true);
                      db.set(`channelscreatesanction_${message.guild.id}`, "derank")
                      db.set(`channelscreatewl_${message.guild.id}`, null)
              
                      db.set(`channelsdel_${message.guild.id}`, true);
                      db.set(`channelsdelsanction_${message.guild.id}`, "derank")
                      db.set(`channelsdelwl_${message.guild.id}`, null)
              
                      db.set(`channelsmod_${message.guild.id}`, true);
                      db.set(`channelsmodsanction_${message.guild.id}`, "derank")
                      db.set(`channelsmodwl_${message.guild.id}`, null)
              
                      db.set(`update_${message.guild.id}`, true);
                      db.set(`updatesanction_${message.guild.id}`, "derank")
                      db.set(`updatewl_${message.guild.id}`, true)
              
                      db.set(`bot_${message.guild.id}`, true);
                      db.set(`botsanction_${message.guild.id}`, "derank")
                      db.set(`botwl_${message.guild.id}`, true)
              
                      db.set(`antideco_${message.guild.id}`, true);
                      db.set(`antidecosanction_${message.guild.id}`, "derank")
                      db.set(`antidecowl_${message.guild.id}`, true)
              
                      db.set(`antitoken_${message.guild.id}`, true)
                      db.get(`crealimit_${message.guild.id}`, true)
                      db.set(`crealimittemps_${message.guild.id}`, ms("1d"))

                      db.set(`link_${message.guild.id}`,true);
                      db.set(`linktype_${message.guild.id}`,'Invite')
              
              
                      return msggg.edit("Tout les modules d'antiraid ont été activées")
                  })
              }
              function off() {
                  message.channel.send("Désactivation en cours (cela peut prendre plusieurs minutes)").then((msggg) => {
                      db.set(`massban_${message.guild.id}`, null);
                      db.set(`webhook_${message.guild.id}`, null);
                      db.set(`rolescreate_${message.guild.id}`, null);
                      db.set(`rolesdel_${message.guild.id}`, null);
                      db.set(`rolesmod_${message.guild.id}`, null);
                      db.set(`rolesadd_${message.guild.id}`, null);
                      db.set(`channelscreate_${message.guild.id}`, null);
                      db.set(`channelsdel_${message.guild.id}`, null);
                      db.set(`channelsmod_${message.guild.id}`, null);
                      db.set(`update_${message.guild.id}`, null);
                      db.set(`bot_${message.guild.id}`, null);
                      db.set(`antideco_${message.guild.id}`, null);
                      db.set(`antitoken_${message.guild.id}`, null)
                      db.set(`crealimit_${message.guild.id}`, null)
                      db.set(`crealimittemps_${message.guild.id}`,null)
                      db.set(`link_${message.guild.id}`,null);
                      db.set(`linktype_${message.guild.id}`,null)
                      db.set(`update_${message.guild.id}`, null);
                      db.set(`updatesanction_${message.guild.id}`, null)
                      db.set(`bot_${message.guild.id}`, null);
                      db.set(`botsanction_${message.guild.id}`, null)
                      return msggg.edit("Tout modules d'antiraid ont été désactivées")
                  })
              }
              
              function max() {
                message.channel.send("Activation en cours (cela peut prendre plusieurs minutes)").then((msggg) => {
                      db.set(`massban_${message.guild.id}`, true);
                      db.set(`massbansanction_${message.guild.id}`, "ban")
                      db.set(`massbanwl_${message.guild.id}`, true)
              
                      db.set(`webhook_${message.guild.id}`, true);
                      db.set(`webhooksanction_${message.guild.id}`, "ban")
                      db.set(`webhookwl_${message.guild.id}`, true)
              
                      db.set(`rolescreate_${message.guild.id}`, true);
                      db.set(`rolescreatesanction_${message.guild.id}`, "ban")
                      db.set(`rolescreatewl_${message.guild.id}`, true)
              
                      db.set(`rolesdel_${message.guild.id}`, true);
                      db.set(`rolesdelsanction_${message.guild.id}`, "ban")
                      db.set(`rolesdelwl_${message.guild.id}`, true)
              
                      db.set(`rolesmod_${message.guild.id}`, true);
                      db.set(`rolesmodsanction_${message.guild.id}`, "ban")
                      db.set(`rolesmodwl_${message.guild.id}`, true)
              
                      db.set(`rolesadd_${message.guild.id}`, true);
                      db.set(`rolesaddsanction_${message.guild.id}`, "ban")
                      db.set(`rolesaddwl_${message.guild.id}`, true)
              
                      db.set(`channelscreate_${message.guild.id}`, true);
                      db.set(`channelscreatesanction_${message.guild.id}`, "ban")
                      db.set(`channelscreatewl_${message.guild.id}`, true)
              
                      db.set(`channelsdel_${message.guild.id}`, true);
                      db.set(`channelsdelsanction_${message.guild.id}`, "ban")
                      db.set(`channelsdelwl_${message.guild.id}`, true)
              
                      db.set(`channelsmod_${message.guild.id}`, true);
                      db.set(`channelsmodsanction_${message.guild.id}`, "ban")
                      db.set(`channelsmodwl_${message.guild.id}`, true)
              
                      db.set(`update_${message.guild.id}`, true);
                      db.set(`updatesanction_${message.guild.id}`, "ban")
                      db.set(`updatewl_${message.guild.id}`, true)
              
                      db.set(`bot_${message.guild.id}`, true);
                      db.set(`botsanction_${message.guild.id}`, "ban")
                      db.set(`botwl_${message.guild.id}`, true)
              
                      db.set(`antideco_${message.guild.id}`, true);
                      db.set(`antidecosanction_${message.guild.id}`, "ban")
                      db.set(`antidecowl_${message.guild.id}`, true)
              
                      db.set(`antitoken_${message.guild.id}`, true)
                      db.set(`crealimit_${message.guild.id}`, true)
                      db.set(`crealimittemps_${message.guild.id}`, ms("1d"))

                      db.set(`link_${message.guild.id}`,true);
                      db.set(`linktype_${message.guild.id}`,'All')
              
                      return msggg.edit("Tout les modules d'antiraid ont été activées en max")
                  })
              }
            const webhookCreate = db.get(`webhook_${message.guild.id}`);
            const webhookCreate2 = db.get(`webhooksanction_${message.guild.id}`) === null ? "kick" : db.get(`webhooksanction_${message.guild.id}`)
            const webhookCreate3 = db.get(`webhookwl_${message.guild.id}`)
 
            const roleCreate = db.get(`rolescreate_${message.guild.id}`);
            const roleCreate2 = db.get(`rolescreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`rolescreatesanction_${message.guild.id}`)
            const roleCreate3 = db.get(`rolescreatewl_${message.guild.id}`)
 
            const roleDel = db.get(`rolesdel_${message.guild.id}`);
            const roleDel2 = db.get(`rolesdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesdelsanction_${message.guild.id}`)
            const roleDel3 = db.get(`rolesdelwl_${message.guild.id}`)
 
            const roleMod = db.get(`rolesmod_${message.guild.id}`);
            const roleMod2 = db.get(`rolesmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesmodsanction_${message.guild.id}`)
            const roleMod3 = db.get(`rolesmodwl_${message.guild.id}`)
 
            const roleAdd = db.get(`rolesadd_${message.guild.id}`);
            const roleAdd2 = db.get(`rolesaddsanction_${message.guild.id}`) === null ? "derank" : db.get(`rolesaddsanction_${message.guild.id}`)
            const roleAdd3 = db.get(`rolesaddwl_${message.guild.id}`)
 
            const channelCreate = db.get(`channelscreate_${message.guild.id}`);
            const channelCreate2 = db.get(`channelscreatesanction_${message.guild.id}`) === null ? "derank" : db.get(`channelscreatesanction_${message.guild.id}`)
            const channelCreate3 = db.get(`channelscreatewl_${message.guild.id}`)
 
            const channelDel = db.get(`channelsdel_${message.guild.id}`);
            const channelDel2 = db.get(`channelsdelsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsdelsanction_${message.guild.id}`)
            const channelDel3 = db.get(`channelsdelwl_${message.guild.id}`)
 
            const channelMod = db.get(`channelsmod_${message.guild.id}`);
            const channelMod2 = db.get(`channelsmodsanction_${message.guild.id}`) === null ? "derank" : db.get(`channelsmodsanction_${message.guild.id}`)
            const channelMod3 = db.get(`channelsmodwl_${message.guild.id}`)
 
            const update = db.get(`update_${message.guild.id}`)
            const update2 = db.get(`updatesanction_${message.guild.id}`) === null ? "derank" : db.get(`updatesanction_${message.guild.id}`)
            const update3 = db.get(`updatewl_${message.guild.id}`)
 
            const ban = db.get(`massban_${message.guild.id}`);
            const ban2 = db.get(`massbansanction_${message.guild.id}`) === null ? "derank" : db.get(`massbansanction_${message.guild.id}`)
            const ban3 = db.get(`massbanwl_${message.guild.id}`)
 
            const bot = db.get(`bot_${message.guild.id}`);
            const bot2 = db.get(`botsanction_${message.guild.id}`) === null ? "derank" : db.get(`botsanction_${message.guild.id}`)
            const bot3 = db.get(`botwl_${message.guild.id}`)



            const ban4 = db.get(`massbannum_${message.guild.id}`) || "2"
            const ban5 = db.get(`massbantime_${message.guild.id}`) || "10s"
 
 
            const link = db.get(`link_${message.guild.id}`);
            const link3 = db.get(`linkwl_${message.guild.id}`)
            const link4 = db.get(`linktype_${message.guild.id}`) || "Invite"
 
            const antimassjoin = db.get(`antitoken_${message.guild.id}`)
            const antimassjoin2 = db.get(`antitokenlimmit1_${message.guild.id}`) || 5
            const antimassjoin3 = db.get(`antitokenlimmit2_${message.guild.id}`) || "5s"
 
            const antitoken = db.get(`crealimit_${message.guild.id}`)
            const antitoken2 = db.get(`crealimittemps_${message.guild.id}`) || "0s"
            if(args[0] == "on") {
                  on()
            } 
            if(args[0] == "off") {
                  off()
            }
            if(args[0] == "max") {
                  max()
            }
            if(!args[0]) { 
            let embed = new MessageEmbed();
            embed.setTitle(`Configuration des modules d'antiraid`)
                .setColor(`BLUE`)
                .addField("Création de salon",`Actif: ${onoff(channelCreate)}
                Sanction: \`${channelCreate2}\``,true)
                .addField("Modification de salon",`Actif: ${onoff(channelMod)}
                Sanction: \`${channelMod2}\``,true)
                .addField("Suppression de salon",`Actif: ${onoff(channelDel)}
                Sanction: \`${channelDel2}\``,true)
                .addField("Création de rôle",`Actif: ${onoff(roleCreate)}
                Sanction:\`${roleCreate2}\``,true)
                .addField("Modification de rôle",` Actif: ${onoff(roleMod)}
                Sanction: \`${roleMod2}\``,true)
                 .addField("Suppression de rôle",`Actif: ${onoff(roleDel)}
                 Sanction: \`${roleDel2}\``,true)
                .addField("Anti Perm Update",` Actif: ${onoff(roleAdd)}
                Sanction: \`${roleAdd2}\``,true)
                .addField("Création de webhook",` Actif: ${onoff(webhookCreate)}
                Sanction: \`${webhookCreate2}\``,true)
                .addField("Anti bannissement de membre",`Actif: ${onoff(ban)}
                Sanction: \`${ban2}\`
                Limit: \`${ban4}/${ban5}\``,true)
                .addField("AntiLien",`Actif: ${onoff(link)}
                Type: \`${link4}\`
                `,true)
                .addField("AntiBot",`Actif: ${onoff(bot)}
                Sanction: \`${bot2}\``,true)
                .addField("Anti modification du serveur",`Actif: ${onoff(update)}
                Sanction: \`${update2}\``,true)
                .addField("Anti double compte",`Actif: ${onoff(antitoken)}
               Limite: \`${antitoken2}\``,true)
               .setColor(color)
               .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
message.channel.send({embeds : [embed]})


            }


      }

}
