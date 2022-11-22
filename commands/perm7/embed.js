const Discord = require('discord.js')
const db = require('quick.db')
const {MessageEmbed, MessageActionRow, MessageButton,MessageSelectMenu,Client,Message } = require('discord.js');

module.exports = {
    name: "embed",
    helpname : "embed",
     description: "Permet de crée un embed",
  
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {  
        const filterMessage = m => message.author.id === m.author.id;
        const filter = m => message.author.id === m.author.id;
      
            let menuoptions = [
                { value: "Copier un embed", description: "", emoji: "📥" },
                { value: "Modifier le titre", description: "", emoji: "🖊" },
                { value: "Supprimer le titre", description: "", emoji: "💥" },
                { value: "Modifier la description", description: "", emoji: "💬" },
                { value: "Supprimer la description", description: "", emoji: "📝" },
                { value: "Modifier l'auteur", description: "", emoji: "🕵️" },
                { value: "Supprimer l'auteur", description: "", emoji: "✂" },
                { value: "Modifier le footer", description: "", emoji: "🔻" },
                { value: "Supprimer le footer ", description: "", emoji: "🔺" },
                { value: "Modifier le thumbnail", description: "", emoji: "🔳" },
                { value: "Modifier l'image", description: "", emoji: "🖼️" },
                { value: "Modifier l'url du titre", description: "", emoji: "🌐" },
                { value: "Modifier la couleur", description: "", emoji: "🎨" },
                { value: "Supprimer la couleur", description: "", emoji: "🔵" },
            

            ]
            let embedbase = new MessageEmbed()
                .setDescription("** **")
            let interactiveButtons = new MessageSelectMenu()
                .setCustomId(message.id+'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Faix un choix')
                .setOptions( menuoptions.map(option => ({
                    label: option.value,
                    value: message.id +  option.value,
                    description: option.description,
                    emoji: option.emoji

                })))
            const bt = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("embed1"+message.id)
            .setEmoji("✅")
            .setLabel("Valider")
            let menu = new MessageActionRow().addComponents(interactiveButtons)
            let butt = new MessageActionRow().addComponents(bt)
  
             message.channel.send({embeds: [embedbase],
                components: [menu,butt] }).then(async msgg => {
                setTimeout(() => {
                    msgg.edit({ components: []})
                }, 60000 * 15)
               


                client.on("interactionCreate",async (i) => {
                    if(!i.isButton())return;
                    if (i.user.id  !==  message.author.id) return i.reply({content : "Vous n'êtes pas autorisé à utiliser cette interaction",ephemeral : true})
                    if(i.customId === "embed1"+message.id){
                        i.deferUpdate()
                        let valider = await message.channel.send("Quel est **le salon ou je dois envoyer l'embed ?**")
                            
                        message.channel.awaitMessages({
                            filter,
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected) => {
                            const lowercase = collected.first().content.toLowerCase()
                            collected.first().delete()
                            valider.delete()
                            let collect = collected.first()
                            let channel = collect.mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)
                            if(!channel ){ return message.channel.send(`Aucun salon trouvé pour \`${collect.content}\``).then((mm) => mm.delete({ timeout: 2500 })) }
                            await channel.send({embeds : [embedbase]})
                            message.channel.send("Embed envoyée")

                        }).catch(async (err) => {
                                
                                message.channel.send("Désolé, mais je ne peux pas envoyer l'embed").then((mm) => mm.delete({
                                    timeout: 2500
                            }));
                        })
                    }
                })
                client.on("interactionCreate", async (i) => { 
                    if(!i.isSelectMenu()) return;
                    if (i.user.id  !==  message.author.id) return i.reply({content : "Vous n'êtes pas autorisé à utiliser cette interaction",ephemeral : true})
                    
                    switch (i.values[0]) {
                        case message.id + "Modifier le titre":
                            i.deferUpdate()
                            let question = await message.channel.send("Quel est **le nouveau titre de l'embed ?**")
                            
                            message.channel.awaitMessages({
                                filter,
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async (collected) => {
                                const lowercase = collected.first().content.toLowerCase()
                           
                                collected.first().delete()
                                question.delete()
                                embedbase.setTitle(collected.first().content)
                                msgg.edit({embeds : [embedbase]})
                                }).catch(async (err) => {
                                    
                                    message.channel.send("**Désolé mais je ne peux pas modifier le Titre !**").then((mm) => mm.delete({
                                        timeout: 2500
                                }));
                            })
                            break

                          case message.id + "Supprimer le titre":
                            i.deferUpdate()
                            embedbase.setTitle("** **")
                            msgg.edit({embeds : [embedbase]})
                            break

                        case message.id + "Modifier la description":
                            i.deferUpdate()
                            let descriptionques = await message.channel.send("Quel est **la nouvelle description de l'embed ?**")
                            
                            message.channel.awaitMessages({
                                filter,
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async (collected) => {
                                const lowercase = collected.first().content.toLowerCase()
                           
                                collected.first().delete()
                                descriptionques.delete()
                                embedbase.setDescription(collected.first().content)
                                msgg.edit({embeds : [embedbase]})
                                }).catch(async (err) => {
                                    
                                    message.channel.send("**Désolé mais je ne peux pas modifier la description !**").then((mm) => mm.delete({
                                        timeout: 2500
                                }));
                            })
                            break

                          case message.id + "Supprimer la description":
                            i.deferUpdate()
                            embedbase.setDescription("** **")
                            msgg.edit({embeds : [embedbase]})
                            break

                        case message.id + "Modifier l'auteur":
                            i.deferUpdate()
                            const embedquest = new Discord.MessageEmbed()                            

                            let SELAMq = await message.channel.send("Quel est **le nouveau autheur de l'embed ?", embedquest.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))
                            
                            message.channel.awaitMessages({
                                filter,
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async (collected) => {
                                const lowercase = collected.first().content.toLowerCase()
                            
                                    collected.first().delete()
                                    SELAMq.delete()
                                    if (collected.first().mentions.users.size <= 0)
                                    {
                                        auteur = collected.first().content;
                                        const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Author, sinon entrez `non`");
                                        const auteurImg = (await message.channel.awaitMessages( {filter, max: 1, time: 60000, errors: ['time']})).first();
                                        question2.delete();
                                        auteurImg.delete();
                                        const img = auteurImg.content
                                        const liens = [
                                            "https://",
                                            "http://",
                                            "https",
                                            "http"
                                        ];
                                        if (!liens.some(word => img.includes(word))){
                                            embedbase.setAuthor(auteur)
                                            message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar a votre Author ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 })) }
        
                                            if (liens.some(word => img.includes(word))){
                                        embedbase.setAuthor(auteur, auteurImg.content)
                                            }
                                    }
                                    if (collected.first().mentions.users.size > 0) 
                                    {
                                        auteur = collected.first().mentions.users.first();
                 
                                        embedbase.setAuthor({name : auteur.username, iconURL : auteur.displayAvatarURL({dynamic: true})});
                                    }
                                msgg.edit({embeds : [embedbase]})
                                }).catch(async (err) => {
                                    
                                    message.channel.send("**Désolé mais je ne peux pas modifier l'Author !**").then((mm) => mm.delete({
                                        timeout: 2500
                                }));
                            })
                            break

                          case message.id + "Supprimer l'auteur":
                            i.deferUpdate()
                            embedbase.setAuthor("** **")
                            msgg.edit(embedbase)
                            break
                        case message.id + "Modifier le footer":
                            i.deferUpdate()
                            const embedtttt = new MessageEmbed()
                            let TDCQUEST2 = await message.channel.send("Quel **Footer** voulez-vous attribuez à l'embed ?", embedtttt.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))
                            
                            message.channel.awaitMessages( {
                                filter,
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(async (collected) => {
                                const lowercase = collected.first().content.toLowerCase()
                     
                                    collected.first().delete()
                                    TDCQUEST2.delete()
                                    if (collected.first().mentions.users.size <= 0)
                                    {
                                        footer = collected.first().content;
                                        const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Footer, sinon entrez `non`");
                                        const footerImg = (await message.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time']})).first();
                                        question2.delete();
                                        footerImg.delete();
                                        const img = footerImg.content
                                        const liens = [
                                            "https://",
                                            "http://",
                                            "https",
                                            "http"
                                        ];
                                        if (!liens.some(word => img.includes(word))){
                                            embedbase.setFooter(footer)
                                            message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar au Footer ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 })) }
        
                                            if (liens.some(word => img.includes(word))){
                                        embedbase.setFooter(footer, footerImg.content)
                                            }
                                    }
                                    if (collected.first().mentions.users.size > 0) 
                                    {
                                        footer = collected.first().mentions.users.first();
                 
                                        embedbase.setFooter(footer.username, footer.displayAvatarURL({dynamic: true}));
                                    }
                                msgg.edit({embeds : [embedbase]})
                                }).catch(async (err) => {
                                    
                                    message.channel.send("**Désolé mais je ne peux pas modifier le Footer !**").then((mm) => mm.delete({
                                        timeout: 2500
                                }));
                            })
                           
                            break

                          case message.id + "Supprimer le footer":
                            i.deferUpdate()
                            embedbase.setFooter("** **")
                            msgg.edit({embeds : [embedbase]})
                            break
                            case message.id + "Modifier le thumbnail":
                                i.deferUpdate()
                                let PASDETDCMEC = await message.channel.send("Quel **Thumbnail** voulez-vous attribuez à l'embed ?")
                                
                                message.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 60000,
                                    errors: ['time']
                                }).then(async (collected) => {
                                    const lowercase = collected.first().content.toLowerCase()
                                 
                                    const thumbnail = collected.first().content
                                    const liens = [
                                        "https://",
                                        "http://",
                                        "https",
                                        "http"
                                    ];
                                    if (!liens.some(word => thumbnail.includes(word))){
                                        collected.first().delete()
                                        PASDETDCMEC.delete()
                                        return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                                   
            
                                    collected.first().delete()
                                    PASDETDCMEC.delete()
                                    embedbase.setThumbnail(collected.first().content)
                                    msgg.edit({embeds : [embedbase]})
                                    }).catch(async (err) => {
                                        
                                        message.channel.send("**Désolé mais je ne peux pas modifier le Thumbnail !**").then((mm) => mm.delete({
                                            timeout: 2500
                                    }));
                                })
                               
                                break
    
                              case message.id + "Supprimer le thumbnail":
                                embedbase.setThumbnail("htps://slm.com")
                                msgg.edit(embedbase)
                                break   
                             case message.id + "Modifier l'image":
                                i.deferUpdate()
                                let heh1 = await message.channel.send("Quel **Image** voulez-vous attribuez à l'embed ?")
                    
                    message.channel.awaitMessages( {
                        filter,
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        const lowercase = collected.first().content.toLowerCase()
                        
                            const image = collected.first().content
                            const liens = [
                                "https://",
                                "http://",
                                "https",
                                "http"
                            ];
                            if (!liens.some(word => image.includes(word))){
                                collected.first().delete()
                                heh1.delete()
                                return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                           
                
                        collected.first().delete()
                        heh1.delete()
                        embedbase.setImage(collected.first().content, {size: 4096})
                        msgg.edit({embeds : [embedbase]})
                        }).catch(async (err) => {
                            
                            message.channel.send("**Désolé mais je ne peux pas modifier l'Image !**").then((mm) => mm.delete({
                                timeout: 2500
                        }));
                    })
                                break
    
                              case message.id + "Supprimer l'image":
                                i.deferUpdate()
                                embedbase.setImage("htps://slm.com")
                                msgg.edit({embeds : [embedbase]})
                                break 
                                
                                case message.id + "Modifier l'url du titre":
                                    i.deferUpdate()
                                    let WASSIMLEMAITRE = await message.channel.send("Quel **URL** voulez-vous attribuez à l'embed ?")
                                    
                                    message.channel.awaitMessages({
                                        filter,
                                        max: 1,
                                        time: 60000,
                                        errors: ['time']
                                    }).then(async (collected) => {
                                        const lowercase = collected.first().content.toLowerCase()
                              
                                            const url = collected.first().content
                                            const liens = [
                                                "https://",
                                                "http://",
                                                "https",
                                                "http"
                                            ];
                                            if (!liens.some(word => url.includes(word))){
                                                collected.first().delete()
                                                WASSIMLEMAITRE.delete()
                                                return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 })) }
                                           
                                                
                                        collected.first().delete()
                                        WASSIMLEMAITRE.delete()
                                        embedbase.setURL(collected.first().content)
                                        msgg.edit({embeds : [embedbase]})
                                        }).catch(async (err) => {
                                            
                                            message.channel.send("**Désolé mais je ne peux pas modifier l'Url !**").then((mm) => mm.delete({
                                                timeout: 2500
                                        }));
                                    })
                                    break
        
                                  case message.id + "Supprimer l'url du titre":
                                    i.deferUpdate()
                                    embedbase.setURL("htps://")
                                    msgg.edit(embedbase)
                                    break
                                    case message.id + "Supprimer l'image":
                                        i.deferUpdate()
                                        embedbase.setImage("** **")
                                        msgg.edit(embedbase)
                                        break 
                                        
                                        case message.id + "Modifier la couleur":
                                            i.deferUpdate()
                                            let HEHEHHE = await message.channel.send("Quel **Couleur** voulez-vous attribuez à l'embed ?")
                                            
                                            message.channel.awaitMessages( {
                                                filter,
                                                max: 1,
                                                time: 60000,
                                                errors: ['time']
                                            }).then(async (collected) => {
                                                const lowercase = collected.first().content.toLowerCase()
                                            
                                    
                                                collected.first().delete()
                                                HEHEHHE.delete()
                                                embedbase.setColor(collected.first().content)
                                                msgg.edit({embeds :[embedbase]})
                                                }).catch(async (err) => {
                                                    
                                                    message.channel.send("**Désolé mais je ne peux pas modifier la Couleur !**").then((mm) => mm.delete({
                                                        timeout: 2500
                                                }));
                                            })
                                            break
                
                                          case message.id + "Supprimer la couleur":
                                            i.deferUpdate()
                                            embedbase.setColor("WASSIM")
                                            msgg.edit({embeds :[embedbase]})
                                            break 
                    
            

                        case message.id + "Copier un embed":
                            i.deferUpdate()
                            const channID = await message.channel.send("Quel est **le salon ou ce trouve le message à copier ?** (*ID*)");
                            const channel_id = (await message.channel.awaitMessages( {filter: filterMessage,max: 1, time: 60000})).first();
                            channID.delete();
                            channel_id.delete();
                            if(!Number(channel_id.content)||!message.guild.channels.cache.get(channel_id.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({timeout: 5000}));
                           const msgQuestionMessageID = await message.channel.send("Quel est **le message de l'embed à copier ?** (*Une ID*)");
                           const message_id = (await message.channel.awaitMessages( {filter: filterMessage,max: 1, time: 60000})).first();
                           msgQuestionMessageID.delete();
                           message_id.delete();
                           if(!Number(message_id.content)||!message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({timeout: 5000}));
                           const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
                           if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({timeout: 50000}));
                           if (msg.partial) {
                            try {
                                await msg.fetch()
                            } catch {
                                return
                            }}
                            msgg.edit({embeds: [msg.embeds[0].toJSON()]})
                            embedbase = msg.embeds[0].toJSON()

                            break

                                  
                    }
                })



            }
            )
        }


    
}