var {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow, MessageButton, Client
} = require(`discord.js`);
var Discord = require(`discord.js`);
const fs = require('fs');
const config = require("../../config.json")
const color = "BLUE"
const ms = require("ms")
const db = require('quick.db')
function onoff(antiraid) {
  if (antiraid === null) return "Aucun"
  if (antiraid === true) return "✅"

}
module.exports = {
  name: "antiraidsetup",
  helpname : "antiraidsetup",
  aliases: ["setup-antiraid", "setupsecur", "antiraidsetup"],
  emoji: '📑',
  BotPerms: "ADMINISTRATOR",
  description: "Permet de configureer la sécurité du serveur",
  ownerOnly: true,
  run: async (client, message, args) => {
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

    try {

      first_layer()
      async function first_layer() {
        let butt = new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Tout activé")
        .setCustomId(message.id + "on")
        .setEmoji("✅")
        let butt2 = new MessageButton()
        .setCustomId(message.id + "off")
        .setLabel("Tout désactivé")
        .setStyle("PRIMARY")
        .setEmoji("❌")
        let butt4 = new MessageButton()
        .setStyle("PRIMARY")
         .setEmoji("🌟")
        .setCustomId(message.id + "max")
        .setLabel("Max")
                let menuoptions = new MessageSelectMenu()
          .setCustomId('MenuSelection')
          .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
          .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
          .setPlaceholder("Clique moi pour setup l'AntiRaid")
          .addOptions([
            {
             label : "Anti Channel Update",
             value : "AntiChannelUpdate"
            },
            {
              label: "Anti Channel Create",
              value: `AntiChannelCreate`,
            },
            {
              label: 'Anti Channel Delete',
              value: `AntiChannelDelete`,
            },
            {
              label: "Anti Role Create",
              value: "AntiRoleCreate",

            },
            {
              label: "Anti Role Delete",
              value: "AntiRoleDelete"
            },
            {
              label : "Anti Role Update",
              value : "AntiRoleUpdate"
            },
            {
              label : "Anti Ban",
              value : "AntiBan"
              },
              {
                label :"Anti Faux Compte",
                value : "AntiDc"
              },
            {
              label: "Anti Link",
              value: "Antilink",
            },
            {
              label: "Anti Bot",
              value: "AntiBot",
            },{
              label : "Anti Serv Update",
              value : "AntiServUpdate"
            },{
              label : "Anti Webhook",
              value : "AntiWebhook"
            },
            {
              label: "Anti Perm Update",
              value: "AntiPermUpdate",
            },
            {
              label : "AntiSpam",
              value : "AntiSpam"
            },
            {
              label: 'Annulé',
              value: "Cancel",
              description: `Tout annulé!`,

            }
          ])

          const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
          let prefix = db.get(`prefix_${message.guild.id}`)
          if(!prefix) {
              prefix = client.config.prefix
          }
         
        
        let but3 =   new MessageButton()
            .setCustomId("Settings")
            .setEmoji("📑")
            .setStyle("PRIMARY")
            .setLabel("Paramètres")
   
        let MenuEmbed = new MessageEmbed()
        .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
          .setTitle("📝・Setup AntiRaid")
          .setAuthor(client.user.username)
          .setColor(color)
          .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
          
        let used1 = false;
        let select = new MessageActionRow().addComponents(menuoptions)
        let buttons = new MessageActionRow().addComponents([butt,butt4,butt2,but3])
        const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [select,buttons] })
      
        function menuselection(i) {
          used1 = true;
        }


      
        let msg = menumsg




        const d2p = (bool) => bool ? "`✔️ Enabled`" : "`❌ Disabled`";
        const d2p2 = (bool) => bool ? "`✔️ Yes`" : "`❌ Nope`";

        let filter1 = (i) => i.user.id === message.author.id;
        const col = await msg.createMessageComponentCollector({
          filter: filter1,
          componentType: "SELECT_MENU"
        })

        col.on("collect", async (i) => {

          if (i.values[0] == "Cancel") {
            menumsg.delete()
            msg.delete()
          }else if (i.values[0] == "AntiChannelUpdate") {
            i.deferUpdate()
            let q = await message.channel.send("Est ce que **je dois punir les personnes qui modifirons des salon ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`channelsmod_${message.guild.id}`, true);
                                            
                                            message.channel.send("Le module a été activé")
                                           responseWbCr.delete();
                                            CollectedWbCr.delete()
                                               let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un modifira des salon ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages({filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`channelsmodsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **modifira un salon** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                            q.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                                        }

                                        } else if (lowercase == "non") {
                                            db.set(`channelsmod_${message.guild.id}`, null);
                                            
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` .")

                                        }
          }else if(i.values[0] == "AntiChannelDelete") {
            i.deferUpdate()
            let q = await message.channel.send("Est ce que **je dois punir les personnes qui supprimerons des salon ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`channelsdel_${message.guild.id}`, true);
        
                message.channel.send("Le module a été activé")
                responseWbCr.delete();
                CollectedWbCr.delete()
                let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un supprimera un salon ?** (`ban`, `kick`, `derank`)")
                const responseWbSanc = await message.channel.awaitMessages( {filter :m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                const CollectedWbSanc = responseWbSanc.first()
                const lowercases = CollectedWbSanc.content.toLowerCase()
                if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
                    db.set(`channelsdelsanction_${message.guild.id}`, lowercases.replace("unrank", "derank"))
                    message.channel.send(`Désormais quand quelqu'un **supprimera un salon** il se fera \`${lowercases.replace("unrank", "derank")}\` `)
                    
                    q.delete();
                    CollectedWbSanc.delete()


                } else {
                    q.delete();
                    CollectedWbSanc.delete()
                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                }

            } else if (lowercase == "non") {
                db.set(`channelsdel_${message.guild.id}`, null);
                message.channel.send("Le module a été desactivé")
                q.delete();
                CollectedWbCr.delete()


            } else {
                q.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
          } else if (i.values[0] == "AntiChannelCreate") {
            await i.deferUpdate()
            let q = await message.channel.send("Est ce que **je dois punir les personnes qui créerons des salon ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`channelscreate_${message.guild.id}`, true);
         
                message.channel.send("Le module a été activé")
                q.delete();
                CollectedWbCr.delete()

                let qs = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera des salon ?** (`ban`, `kick`, `derank`)")
                const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                const CollectedWbSanc = responseWbSanc.first()
                const lowercases = CollectedWbSanc.content.toLowerCase()
                if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
                    db.set(`channelscreatesanction_${message.guild.id}`, lowercases.replace("unrank", "derank"))
                    message.channel.send(`Désormais quand quelqu'un **créera un salon** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                    qs.delete();
                    CollectedWbSanc.delete()
    
    
                } else {
                    qs.delete();
                    CollectedWbSanc.delete()
                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                }

            } else if (lowercase == "non") {
                db.set(`channelscreate_${message.guild.id}`, null);
                
                message.channel.send("Le module a été desactivé")
                q.delete();
                CollectedWbCr.delete()


            } else {
                q.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
           

          } else if (i.values[0] == "AntiRoleCreate") {
            await i.deferUpdate()
            let q = await message.channel.send("Est ce que **je dois punir les personnes qui créerons des rôles ?** (\`oui\` ou \`non\`)")
                                const responseWbCr = await message.channel.awaitMessages( {
                                  filter : m => m.author.id === message.author.id,
                                   max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                const CollectedWbCr = responseWbCr.first()
                                const lowercase = CollectedWbCr.content.toLowerCase()
                                if (lowercase == "oui") {
                                    db.set(`rolescreate_${message.guild.id}`, true);
                                    message.channel.send("Le module a été activé")
                                    q.delete();
                                    CollectedWbCr.delete()
                                    let qs = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un créera un rôle ?** (`ban`, `kick`, `derank`)")
                                    const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercases = CollectedWbSanc.content.toLowerCase()
                                    if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
                                        db.set(`rolescreatesanction_${message.guild.id}`, lowercases.replace("unrank", "derank"))
                                        message.channel.send(`Désormais quand quelqu'un **créera un rôle** il se fera \`${lowercases.replace("unrank", "derank")}\` `)
                                        
                                        qs.delete();
                                        CollectedWbSanc.delete()
    
    
                                    } else {
                                        qs.delete();
                                        CollectedWbSanc.delete()
                                        return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                                    }

                                } else if (lowercase == "non") {
                                    db.set(`rolescreate_${message.guild.id}`, null);
                                    
                                    message.channel.send("Le module a été desactivé")
                                    q.delete();
                                    CollectedWbCr.delete()


                                } else {
                                    q.delete();
                                    CollectedWbCr.delete()
                                    return message.channel.send("C'est sois `oui` ou `non` .")

                                }

                               

          } else if (i.values[0] == "AntiRoleDelete") {
            await i.deferUpdate()
            let q = await message.channel.send("Est ce que **je dois punir les personnes qui supprimerons des rôles ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages( {
              filter : m => m.author.id === message.author.id,
               max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`rolesdel_${message.guild.id}`, true);
             
                message.channel.send("Le module a été activé")
                q.delete();
                CollectedWbCr.delete()
                
            let qs = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un supprimera un rôle ?** (`ban`, `kick`, `derank`)")
            const responseWbSanc = await message.channel.awaitMessages( {
              filter : m => m.author.id === message.author.id,
               max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbSanc = responseWbSanc.first()
            const lowercases = CollectedWbSanc.content.toLowerCase()
            if (lowercases != "cancel" && lowercases == "ban" || lowercases == "kick" || lowercases == "unrank" || lowercases == "derank") {
                db.set(`rolesdelsanction_${message.guild.id}`, lowercases.replace("unrank", "derank"))
                message.channel.send(`Désormais quand quelqu'un **supprimera un rôle** il se fera \`${lowercases.replace("unrank", "derank")}\` `)
             
                qs.delete();
                CollectedWbSanc.delete()


            } else {
                qs.delete();
                CollectedWbSanc.delete()
                return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
            }

            } else if (lowercase == "non") {
                db.set(`rolesdel_${message.guild.id}`, null);
               
                message.channel.send("Le module a été desactivé")
                q.delete();
                CollectedWbCr.delete()


            } else {
                q.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }

          }else if (i.values[0] == 'AntiRoleUpdate') {
            i.deferUpdate()
            let qs = await message.channel.send("Est ce que **je dois punir les personnes qui modifirons des rôles ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`rolesmod_${message.guild.id}`, true);
              
                message.channel.send("Le module a été activé")
                qs.delete();
                CollectedWbCr.delete()
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
                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                }


            } else if (lowercase == "non") {
                db.set(`rolesmod_${message.guild.id}`, null);
           
                message.channel.send("Le module a été desactivé")
                qs.delete();
                CollectedWbCr.delete()


            } else {
                qs.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
          } else if (i.values[0] == "Antilink") {
            await i.deferUpdate()
            let qs = await message.channel.send("Est ce que **je dois punir les personnes qui envoie des liens ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`link_${message.guild.id}`, true);
                                          
                                            message.channel.send("Le module a été activé")
                                            qs.delete();
                                            CollectedWbCr.delete()
                                            let q = await message.channel.send("Quel est **le type de lien que je dois prendre en compte ?** (`invite`, `all`)")
                                            const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                            const CollectedWbSanc = responseWbSanc.first()
                                            const lowercase = CollectedWbSanc.content.toLowerCase()
                                            if (lowercase == "invite") {
                                                db.set(`linktype_${message.guild.id}`, "Invite");
                                               
                                                q.delete();
                                                CollectedWbSanc.delete()
    
                                            } else if (lowercase == "all") {
                                                db.set(`linktype_${message.guild.id}`, "All");
                                               
                                                q.delete();
                                                CollectedWbSanc.delete()
    
    
                                            } else {
                                                q.delete();
                                                CollectedWbSanc.delete()
                                                return message.channel.send("C'est sois `invite` ou `all` .")
    
                                            }
                                        } else if (lowercase == "non") {
                                            db.set(`link_${message.guild.id}`, null);
                                            message.channel.send("Le module a été desactivé")
                                            qs.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            qs.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` .")

                                        }
          } else if (i.values[0] == "AntiBot") {
            await i.deferUpdate()
            let qs = await message.channel.send("Est ce que **je dois punir les personnes qui ajouterons des bots ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`bot_${message.guild.id}`, true);
                message.channel.send("Le module a été activé")
                qs.delete();
                CollectedWbCr.delete()
                let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un ajoutera un bot ?** (`ban`, `kick`, `derank`)")
                const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                const CollectedWbSanc = responseWbSanc.first()
                const lowercase = CollectedWbSanc.content.toLowerCase()
                if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                    db.set(`botanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                    message.channel.send(`Désormais quand quelqu'un **ajoutera un bot** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                  
                    q.delete();
                    CollectedWbSanc.delete()


                } else {
                    q.delete();
                    CollectedWbSanc.delete()
                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                }


            } else if (lowercase == "non") {
                db.set(`bot_${message.guild.id}`, null);
            
                message.channel.send("Le module a été desactivé")
                qs.delete();
                CollectedWbCr.delete()


            } else {
                qs.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
          } else if(i.values[0] == "AntiDc") {
                 i.deferUpdate()
                 let q = await message.channel.send("Est ce que **je dois bannir les token ?** (\`oui\` ou \`non\`)")

                 const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                 const CollectedWbCr = responseWbCr.first()
                 const lowercase = CollectedWbCr.content.toLowerCase()
                 if (lowercase == "oui") {
                     db.set(`crealimit_${message.guild.id}`, true);
                  
                     message.channel.send("Le module a été activé")
                     q.delete();
                     CollectedWbCr.delete()
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

                 } else if (lowercase == "non") {
                     db.set(`crealimit_${message.guild.id}`, null);
                  
                     message.channel.send("Le module a été desactivé")
                     qs.delete();
                     CollectedWbCr.delete()


                 } else {
                     qs.delete();
                     CollectedWbCr.delete()
                     return message.channel.send("C'est sois `oui` ou `non` .")

                 }
          } else if (i.values[0] == "AntiPermUpdate") {
            await i.deferUpdate()
            let q = await message.channel.send("Est ce que **je dois punir les personnes qui ajouterons des permissions à un membre ?** (\`oui\` ou \`non\`)")

                                        const responseWbCr = await message.channel.awaitMessages({filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbCr = responseWbCr.first()
                                        const lowercase = CollectedWbCr.content.toLowerCase()
                                        if (lowercase == "oui") {
                                            db.set(`rolesadd_${message.guild.id}`, true);
                                      
                                            message.channel.send("Le module a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()
                                            let qs = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un ajoutera des permissions à un membre ?** (`ban`, `kick`, `derank`)")
                                        const responseWbSanc = await message.channel.awaitMessages({filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                                            db.set(`rolesaddsanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                                            message.channel.send(`Désormais quand quelqu'un **ajoutera des permissions à un membre** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
                                         
                                            qs.delete();
                                            CollectedWbSanc.delete()


                                        } else {
                                            qs.delete();
                                            CollectedWbSanc.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                                        }

                                        } else if (lowercase == "non") {
                                            db.set(`rolesadd_${message.guild.id}`, null);
                                        
                                            message.channel.send("Le module a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()


                                        } else {
                                            q.delete();
                                            CollectedWbCr.delete()
                                            return message.channel.send("C'est sois `oui` ou `non` .")

                                        }
          } else if (i.values[0] == "AntiKick") {
            await i.deferUpdate()
            let link = db.get("ankick" + message.guild.id)
            if (link == true) {
              db.delete(`ankick${message.guild.id}`)
              await message.channel.send("L'AntiKick vient d'être désactivé")
            } else {

              await db.set(`ankick` + message.guild.id, true)
              await message.channel.send("L'AntiKick vient d'être activé")
            }


          } else if (i.values[0] == "AntiBan") {
            i.deferUpdate()
            let qss = await message.channel.send("Est ce que **je dois punir les personnes qui bannirons des membres ?** (\`oui\` ou \`non\`)")
            const responseWbCr = await message.channel.awaitMessages( {filter :m => m.author.id === message.author.id,  max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`massban_${message.guild.id}`, true);
  
                message.channel.send("Le module a été activé")
                qss.delete();
                CollectedWbCr.delete()
                let q = await message.channel.send("Combien de fois **on dois bannir des membres pour que je punissent ?** (*ex: 2*)")
                                        const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                                        const CollectedWbSanc = responseWbSanc.first()
                                        const lowercase = CollectedWbSanc.content.toLowerCase()
                                        if (isNaN(lowercase)) {
                                            q.delete()
                                            message.channel.send("Ceci n'est pas un nombre")

                                        } else {
                                            let q2 = await message.channel.send(`En combien **de temps on dois faire ${lowercase} ban pour être punie ?** (*ex: 10s*)`)
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
                                            message.channel.send(`Désormais quand quelqu'un **bannira un membre** il se fera \`${lowercases.replace("unrank", "derank")}\` `)
                                            
                                            qs.delete();
                                            CollectedWbSancs.delete()


                                        } else {
                                            qs.delete();
                                            CollectedWbSancs.delete()
                                            return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                                        }

            } else if (lowercase == "non") {
                db.set(`massban_${message.guild.id}`, null);
                message.channel.send("Le module a été desactivé")
                qss.delete();
                CollectedWbCr.delete()


            } else {
                qss.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
            
          } else if (i.values[0] == "AntiWebhook") {
            i.deferUpdate()
            let qs = await message.channel.send("Est ce que **je dois punir les personnes qui créerons des webhook ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages({filter : m => m.author.id === message.author.id,  max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`webhook_${message.guild.id}`, true);
             
                message.channel.send("Le module a été activé")
                qs.delete();
                CollectedWbCr.delete()
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
                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                }

            } else if (lowercase == "non") {
                db.set(`webhook_${message.guild.id}`, null);
              
                message.channel.send("Le module a été desactivé")
                qs.delete();
                CollectedWbCr.delete()


            } else {
                qs.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
          } else if (i.values[0] == "AntiServUpdate") {
            i.deferUpdate()
            let qs = await message.channel.send("Est ce que **je dois punir les personnes qui modifirons le serveur ?** (\`oui\` ou \`non\`)")

            const responseWbCr = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
            const CollectedWbCr = responseWbCr.first()
            const lowercase = CollectedWbCr.content.toLowerCase()
            if (lowercase == "oui") {
                db.set(`update_${message.guild.id}`, true);
           
                message.channel.send("Le module a été activé")
                qs.delete();
                CollectedWbCr.delete()
                let q = await message.channel.send("Qu'est ce que je dois faire **quand quelqu'un modifira le serveur ?** (`ban`, `kick`, `derank`)")
                const responseWbSanc = await message.channel.awaitMessages( {filter : m => m.author.id === message.author.id, max: 1, timeout: 30000 }).catch(() => { message.channel.send("Trop long") })
                const CollectedWbSanc = responseWbSanc.first()
                const lowercase = CollectedWbSanc.content.toLowerCase()
                if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "derank") {
                    db.set(`updatesanction_${message.guild.id}`, lowercase.replace("unrank", "derank"))
                    message.channel.send(`Désormais quand quelqu'un **modifira le serveur** il se fera \`${lowercase.replace("unrank", "derank")}\` `)
               
                    q.delete();
                    CollectedWbSanc.delete()


                } else {
                    q.delete();
                    CollectedWbSanc.delete()
                    return message.channel.send("C'est sois `ban`, `kick` ou `derank` .")
                }


            } else if (lowercase == "non") {
                db.set(`update_${message.guild.id}`, null);
              
                message.channel.send("Le module a été desactivé")
                qs.delete();
                CollectedWbCr.delete()


            } else {
                qs.delete();
                CollectedWbCr.delete()
                return message.channel.send("C'est sois `oui` ou `non` .")

            }
          } else if(i.values[0] == "AntiSpam"){
            i.deferUpdate()
            let link =db.get(`antispam_${message.guild.id}`)
            if(link == true) {
              db.delete(`antispam_${message.guild.id}`)
              message.channel.send("L'AntiSpam est maintenant désactivé")
            } else {
              db.set(`antispam_${message.guild.id}`, true)
              message.channel.send("L'AntiSpam est maintenant activé")
            }
          } 


          //settings

        })


        client.on("interactionCreate", async (i) => {
          if (!i.isButton) return;
          if(i.customId == message.id + "on") {
            i.deferUpdate()
            on()
          }
          if(i.customId == message.id + "off") {
            i.deferUpdate()
            off()
          }
          if(i.customId == message.id + "max") {
            i.deferUpdate()
            max()
          }
          if (i.customId == 'Settings') {
            i.deferUpdate()
            let buttons = new MessageActionRow().setComponents([
              new MessageButton()
                  .setCustomId("Previous")
                  .setEmoji("↩️")
                  .setStyle("PRIMARY")
                  .setLabel("Retour"),
           ])
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

           let embed = new Discord.MessageEmbed();
           embed.setTitle(`Configuration des modules d'antiraid`)
                .setColor(color)
               .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
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
i.message.edit({embeds : [embed],components : [buttons]})
          } else if(i.customId == "Previous") {
            
            i.update({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions]), buttons] })
          }


        })
      }
    }

    catch (e) {
      console.log(e)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(color)
          .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
          .setTitle("Une erreur est survenu")
          .setDescription('Erreur intattenudu')
        ]
      });
    }
  },
}




