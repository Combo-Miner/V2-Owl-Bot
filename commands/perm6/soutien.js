const Discord = require('discord.js')
const db = require('quick.db')

const { MessageActionRow, MessageButton, MessageSelectMenu,MessageEmbed } = require('discord.js')

module.exports = {
    name: 'soutien',
    helpname : "soutien",
    description : "Configuré le soutien",
    aliases: [],
    run: async (client, message, args) => {
      const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
      let prefix = db.get(`prefix_${message.guild.id}`)
      if(!prefix) {
          prefix = client.config.prefix
      }
    
        function updateembed(msg) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Soutien`)
                .setColor(color)
                .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
                .addField("Rôle", db.get(`rolesupp_${msg.guild.id}`) === null ? "Aucun" : `<@&${db.get(`rolesupp_${msg.guild.id}`)}> (${db.get(`rolesupp_${msg.guild.id}`)})`)
                .addField("Statut", db.get(`txtsupp_${msg.guild.id}`) === null ? "Aucun" : `${db.get(`txtsupp_${msg.guild.id}`)}`)



            let menuoptions = [
                { value: "Modifier le rôle", description: "", emoji: "🏷️" },
                { value: "Supprimer le rôle", description: "", emoji: "🛎️" },
                { value: "Modifier le statut", description: "", emoji: "📩" },
                { value: "Supprimer le statut", description: "", emoji: "✉️" },



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
                    emoji : option.emoji
            
                   
            })
            ))

            const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id+"soutien")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            let select = new MessageActionRow().addComponents(interactiveButtons)
            let butt = new MessageActionRow().addComponents(bt2)
           msg.edit({embeds: [embed],
                components: [select,butt]})           }  
                let msg = message 
                const embed = new Discord.MessageEmbed()
                .setTitle(`Configuration Soutien`)
                .setColor(color)
                .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
                .addField("Rôle", db.get(`rolesupp_${msg.guild.id}`) === null ? "Aucun" : `<@&${db.get(`rolesupp_${msg.guild.id}`)}> (${db.get(`rolesupp_${msg.guild.id}`)})`)
                .addField("Statut", db.get(`txtsupp_${msg.guild.id}`) === null ? "Aucun" : `${db.get(`txtsupp_${msg.guild.id}`)}`)



            let menuoptions = [
                { value: "Modifier le rôle", description: "", emoji: "🏷️" },
                { value: "Supprimer le rôle", description: "", emoji: "🛎️" },
                { value: "Modifier le statut", description: "", emoji: "📩" },
                { value: "Supprimer le statut", description: "", emoji: "✉️" },



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
                    emoji : option.emoji
            
                   
            })
            ))

            const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id+"soutien")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            let select = new MessageActionRow().addComponents(interactiveButtons)
            let butt = new MessageActionRow().addComponents(bt2)
           message.channel.send({embeds: [embed],
                components: [select,butt]})   .then(async m => {
                setTimeout(() => {
                    m.edit({ components: [], embeds: [embed] })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on('interactionCreate', async (button) => {
                  if(!button.isButton()) return;
                    if ( button.user.id !== message.author.id) return message.channel.send("Vous n'êtes pas autorisé à utilisé cette interaction")
                
                    if(button.customId === message.id+"soutien") {
                        button.deferUpdate()
updateembed(m)
                    }
                })
                 client.on("interactionCreate",async (menu)=> { 
                  if(!menu.isSelectMenu()) return;
                  if ( menu.user.id !== message.author.id) return message.channel.send("Vous n'êtes pas autorisé à utilisé cette interaction")
                    switch (menu.values[0]) {
                        case "Modifier le rôle":
                          menu.deferUpdate()
                            message.channel.send(`Quel est **le nouveau rôle de soutien** ?`).then(mp => {
                                mp.channel.awaitMessages(  {filter : (m) => m.author.id == message.author.id, max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {

                                        var msg = cld.first();
                                        var role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                                        if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\`.`);

                                        db.set(`rolesupp_${message.guild.id}`, role.id)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })
                            break
                        case "Supprimer le rôle":
                          menu.deferUpdate()
                            db.delete(`rolesupp_${message.guild.id}`)
                            updateembed(m)
                            break
                        case "Modifier le statut":
                          menu.deferUpdate()
                            message.channel.send(`Quel est **le status accepté ?** ?`).then(mp => {
                              mp.channel.awaitMessages(  {filter : (m) => m.author.id == message.author.id, max: 1, time: 60000, errors: ['time'] })
                                    .then(cld => {
                                        let msg = cld.first()

                                        db.set(`txtsupp_${message.guild.id}`, msg.content)
                                        mp.delete()
                                        cld.first().delete()
                                        updateembed(m)

                                    });
                            })

                            break
                        case "Supprimer le statut":
                          menu.deferUpdate()
                            db.delete(`txtsupp_${message.guild.id}`)
                            updateembed(m)
                            break

                    }
                
            })
          })

        }

    }
