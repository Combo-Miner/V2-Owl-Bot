
const db = require('quick.db')
const { MessageActionRow, Message,Client,MessageButton,MessageSelectMenu,MessageEmbed } = require('discord.js');
module.exports = {
    name: 'logs',
    helpname : "logs",
    description : "Permet de configuré les logs",
    aliases: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message,args) => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }
      
        function updateembed(msg) {
            const embed = new MessageEmbed()
            .setTitle(`Configuration Logs`)
            .setColor(color)
            
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Logs Modérateur", message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`)) ?   `<#${db.get(`logmod_${message.guild.id}`)}> (${db.get(`logmod_${message.guild.id}`)})`:"Aucun")
            .addField("Logs Message", message.guild.channels.cache.get(db.get(`msglog_${message.guild.id}`)) ?   `<#${db.get(`msglog_${message.guild.id}`)}> (${db.get(`msglog_${message.guild.id}`)})`:"Aucun")
            .addField("Logs Vocal",message.guild.channels.cache.get( db.get(`logvc_${message.guild.id}`)) ?   `<#${db.get(`logvc_${message.guild.id}`)}> (${db.get(`logvc_${message.guild.id}`)})`:"Aucun")
            .addField("Logs Boost",message.guild.channels.cache.get(  db.get(`boost_${message.guild.id}`)) ?   `<#${ db.get(`boost_${message.guild.id}`)}> (${ db.get(`boost_${message.guild.id}`)})`:"Aucun")
            .addField("Logs Raid",message.guild.channels.cache.get(  db.get(`raid_logs${message.guild.id}`)) ?   `<#${ db.get(`raid_logs${message.guild.id}`)}> (${ db.get(`raid_logs${message.guild.id}`)})`:"Aucun")



        let menuoptions = [
            { value: "Configuration automatique", description: "", emoji: "🔰" },
            {value : "Supprimer la configuration automatique",description : "",emoji : "❌"},
            { value: "Modifier le salon de logs mods", description: "", emoji: "🏷️" },
            { value: "Supprimer le salon de logs mods", description: "", emoji: "🛎️" },
            { value: "Modifier le salon de logs message", description: "", emoji: "📩" },
            { value: "Supprimer le salon de logs message", description: "", emoji: "✉️" },
            { value: "Modifier le salon de logs vocal", description: "", emoji: "🎧" },
            { value: "Supprimer le salon de logs vocal", description: "", emoji: "🔊" },



        ]

      
            

            let interactiveButtons = new MessageSelectMenu()
                .setCustomId(message.id+'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Faix un choix')
            .setOptions(menuoptions.map(option => ({
   
                    label : option.value,
                    value : option.value,
                    description : option.description,
                    emoji : option.emoji,
          
            })
            ))
            const bt2 = new MessageButton()
            .setStyle("SECONDARY")
            .setCustomId("logs"+message.id)
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            let butt = new MessageActionRow().addComponents(bt2)
            let select = new MessageActionRow().addComponents(interactiveButtons)
           msg.edit({embeds: [embed], components : [select,butt]})        }
        
        
           const embed = new MessageEmbed()
           .setTitle(`Configuration Logs`)
           .setColor(color)
           .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
           .addField("Logs Modérateur", message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`)) ?   `<#${db.get(`logmod_${message.guild.id}`)}> (${db.get(`logmod_${message.guild.id}`)})`:"Aucun")
           .addField("Logs Message", message.guild.channels.cache.get(db.get(`msglog_${message.guild.id}`)) ?   `<#${db.get(`msglog_${message.guild.id}`)}> (${db.get(`msglog_${message.guild.id}`)})`:"Aucun")
           .addField("Logs Vocal",message.guild.channels.cache.get( db.get(`logvc_${message.guild.id}`)) ?   `<#${db.get(`logvc_${message.guild.id}`)}> (${db.get(`logvc_${message.guild.id}`)})`:"Aucun")
           .addField("Logs Boost",message.guild.channels.cache.get(  db.get(`boost_${message.guild.id}`)) ?   `<#${ db.get(`boost_${message.guild.id}`)}> (${ db.get(`boost_${message.guild.id}`)})`:"Aucun")
           .addField("Logs Raid",message.guild.channels.cache.get(  db.get(`raid_logs${message.guild.id}`)) ?   `<#${ db.get(`raid_logs${message.guild.id}`)}> (${ db.get(`raid_logs${message.guild.id}`)})`:"Aucun")



       let menuoptions = [
        { value: "Configuration automatique", description: "", emoji: "🔰" },
        {value : "Supprimer la configuration automatique",description : "",emoji : "❌"},
           { value: "Modifier le salon de logs mods", description: "", emoji: "🏷️" },
           { value: "Supprimer le salon de logs mods", description: "", emoji: "🛎️" },
           { value: "Modifier le salon de logs message", description: "", emoji: "📩" },
           { value: "Supprimer le salon de logs message", description: "", emoji: "✉️" },
           { value: "Modifier le salon de logs vocal", description: "", emoji: "🎧" },
           { value: "Supprimer le salon de logs vocal", description: "", emoji: "🔊" },



       ]

     
           

           let interactiveButtons = new MessageSelectMenu()
               .setCustomId(message.id+'MenuSelection')
               .setMaxValues(1)
               .setMinValues(1)
               .setPlaceholder('Faix un choix')
           .setOptions(menuoptions.map(option => ({
  
                   label : option.value,
                   value : option.value,
                   description : option.description,
                   emoji : option.emoji,
         
           })
           ))
           const bt2 = new MessageButton()
           .setStyle("SECONDARY")
           .setCustomId("logs"+message.id)
           .setEmoji("❌")
           .setLabel("Re formuler votre choix")
           let butt = new MessageActionRow().addComponents(bt2)
           let select = new MessageActionRow().addComponents(interactiveButtons) 
           message.channel.send({embeds : [embed], components : [select,butt]})  .then(async m => {
                setTimeout(() => {
                    m.edit( { components: [], embeds: [ new MessageEmbed()
                    .setTitle(`Configuration Logs`)
                    .setColor(color)
                    .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                    .addField("Logs Mods", message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`)) ?   `<#${db.get(`logmod_${message.guild.id}`)}> (${db.get(`logmod_${message.guild.id}`)})`:"Aucun")
                    .addField("Logs Message", message.guild.channels.cache.get(db.get(`msglog_${message.guild.id}`)) ?   `<#${db.get(`msglog_${message.guild.id}`)}> (${db.get(`msglog_${message.guild.id}`)})`:"Aucun")
                    .addField("Logs Vocal",message.guild.channels.cache.get( db.get(`logvc_${message.guild.id}`)) ?   `<#${db.get(`logvc_${message.guild.id}`)}> (${db.get(`logvc_${message.guild.id}`)})`:"Aucun")
                    .addField("Logs Boost",message.guild.channels.cache.get(  db.get(`boost_${message.guild.id}`)) ?   `<#${ db.get(`boost_${message.guild.id}`)}> (${ db.get(`boost_${message.guild.id}`)})`:"Aucun")
                    .addField("Logs Raid",message.guild.channels.cache.get(  db.get(`raid_logs${message.guild.id}`)) ?   `<#${ db.get(`raid_logs${message.guild.id}`)}> (${ db.get(`raid_logs${message.guild.id}`)})`:"Aucun")]
         })
                    // message.channel.send(embeds)
                }, 60000 * 5)
              
                client.on('interactionCreate', async (i) => {
                    if(!i.isButton) return;
                    if (i.user.id !== message.author.id) return i.reply({content: "Tu n'est pas autorisé a utilisé cette interaction ",ephemeral: true})
                    if(i.customId == "logs" + message.id) {
                     i.deferUpdate()
                     updateembed(m)
                    }
                 
                 })
                 client.on('interactionCreate', async (i) => {
                    if(!i.isSelectMenu()) return;
                    if (i.user.id !== message.author.id) return i.reply({content : "Tu n'est pas autorisé a utilisé cette interaction ", ephemeral: true})
                    switch (i.values[0]) {
                        case "Configuration automatique":
                            i.deferUpdate()
                            message.channel.send(`Création de la **catégorie** des Compteurs en cours..`).then(msge => {
                                message.guild.channels.create('LOGS', {
                                    type: 'GUILD_CATEGORY',
                                    permissionsOverwrites: [{
                                        id: message.guild.id,
                                        deny: ['VIEW_CHANNEL']
                                    }]
                                }).then(c => {
                                    db.set("logscategory_" + message.guild.id,c)
                                    c.setPosition(999)
                                    c.guild.channels.create(`💾・message-logs`, {
                                        type: 'GUILD_TEXT',
                                        parent: c.id,
                                        permissionOverwrites: [
                                            { 
                                                id: message.guild.id,
                                                deny: ['VIEW_CHANNEL']
                                            },
                                        ],
                                    }).then(total => {
                                        db.set(`msglog_${message.guild.id}`, total.id)
                                        c.guild.channels.create(`💾・vocal-logs`, {
                                            type: 'GUILD_TEXT',
                                            parent: c.id,
                                            permissionOverwrites: [
                                                {
                                                    id: message.guild.id,
                                                    deny: ['VIEW_CHANNEL']
                                                },
                                            ],
                                        }).then(online => {
                                            db.set(`logvc_${message.guild.id}`, online.id)

                                            c.guild.channels.create(`💾・raid-logs`, {
                                                type: 'GUILD_TEXT',
                                                parent: c.id,
                                                permissionOverwrites: [
                                                    {
                                                        id: message.guild.id,
                                                        deny: ['VIEW_CHANNEL']
                                                    },
                                                ],
                                            }).then(vocal => {
                                                db.set(`raid_logs${message.guild.id}`, vocal.id)

                                                c.guild.channels.create(`💾・boost-logs`, {
                                                    type: 'GUILD_TEXT',
                                                    parent: c.id,
                                                    permissionOverwrites: [
                                                        {
                                                            id: message.guild.id,
                                                            deny: ['VIEW_CHANNEL']
                                                        },
                                                    ],
                                                }).then(boost => {
                                                    db.set(`boost_${message.guild.id}`, boost.id)

                                                    
                                                    c.guild.channels.create(`💾・mods-logs`,
                                                     {
                                                        type: 'GUILD_TEXT',
                                                        parent: c.id,
                                                        permissionOverwrites: [
                                                            {
                                                                id: message.guild.id,
                                                                deny: ['VIEW_CHANNEL']
                                                            },
                                                        ],
                                                   })
                                                 
                                                  

                                               .then(loogs => {
                                                    db.set(`logmod_${message.guild.id}`, loogs.id)
                                                    msge.edit(`Création de la **catégorie** des Compteurs effectué avec succès.`)
                                                    updateembed(m)
                                                    
                                                })
                                            })
                                        })
                                        })
                                    })
                                })
                            })
                            break
                            case "Supprimer la configuration automatique" : 
                            i.deferUpdate()
                            
                             let channels = [
                                db.get(`boost_${message.guild.id}`),
                                db.get(`raid_logs${message.guild.id}`),
                                db.get(`logvc_${message.guild.id}`),
                                db.get(`msglog_${message.guild.id}`),
                                db.get("logscategory_" + message.guild.id)


                             ]
                             let cat = client.channels.cache.get(db.get("logscategory_" + message.guild.id))
                            
                      
                             channels.forEach(c=> client.channels.cache.get(c).delete())
                             cat.delete()
                            
                             break

                        case "Modifier le salon de logs mods":
                            i.deferUpdate()
                            message.channel.send(`Quel est **le nouveau salon de logs mods** ?`).then(mp => {
                                mp.channel.awaitMessages( {
                                    filter : (m) => m.author.id == message.author.id,
                                     max: 1,
                                      time: 60000, 
                                      errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                                        db.set(`logmod_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le salon de logs mods":
                            i.deferUpdate()
                            db.delete(`logmod_${message.guild.id}`)
                            updateembed(m)
                            break

                           case "Modifier le salon de logs message":
                            i.deferUpdate()
                            message.channel.send(`Quel est **le nouveau salon de logs message** ?`).then(mp => {
                                mp.channel.awaitMessages( {
                                    filter : (m) => m.author.id == message.author.id,
                                     max: 1,
                                      time: 60000, 
                                      errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                        if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                                        db.set(`msglog_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le salon de logs message":
                            i.deferUpdate()
                            db.delete(`msglog_${message.guild.id}`)
                            updateembed(m)
                            break        

                            case "Modifier le salon de logs vocal":
                                i.deferUpdate()
                                message.channel.send(`Quel est **le nouveau salon de logs vocal** ?`).then(mp => {
                                    mp.channel.awaitMessages( {
                                        filter : (m) => m.author.id == message.author.id,
                                         max: 1,
                                          time: 60000, 
                                          errors: ['time'] })
                                        .then(cld => {
    
                                            var msg = cld.first();
                                            var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                                            if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);
    
                                            db.set(`logvc_${message.guild.id}`, role.id)
                                            mp.delete()
                                            cld.first().delete()
                                            updateembed(m)
    
                                        });
                                })
                                break
                            case "Supprimer le salon de logs vocal":
                                i.deferUpdate()
                                db.delete(`logvc_${message.guild.id}`)
                                updateembed(m)
                                break    
                    }
                
            })

                         })

    }
}
