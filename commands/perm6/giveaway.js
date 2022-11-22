const { Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Util,Message } = require('discord.js');
const db = require('quick.db')
const ms = require('ms')
const config = require("../../config.json")
module.exports = {
    name: 'giveaway',
    description: 'Configurer un giveaway',
    helpname : "giveaway <reroll id>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
      
        if(args[0] == "reroll") {
            if(!args.lenght > 0) {
                message.channel.messages.fetch(args[1]).then(m => {
                    let msg = message
        
                     if(args[1]) { 
                    if(!m) return message.channel.send(`Aucun giveaway trouvé dans ce salon, essayez \`prefix + giveaway reroll + <message id>\``);
                    
                    let winner = false
                    
                    winner = m.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉" : db.get(`2reactgv${message.guild.id}`) === null ? db.get(`reactgv${message.guild.id}`) : db.get(`2reactgv${message.guild.id}`)}`).users.cache.filter((u) => !u.bot).random() //.filter((u) => !u.bot)
                    
                    if(!winner) return message.channel.send(`Aucun participant valide`)
                     message.channel.send(`Félicitation à ${winner} qui gagne ${db.get(`gain${message.guild.id}`)}`)
                    } else{
                        return message.channel.send(`Aucun giveaway trouvé dans ce salon, essayez \`prefix + giveaway reroll + <message id>\``);
                    }
        
                })
                    
        }
    } else if(!args[0]) { 

        function   updateembed(message) {
            const embed = new MessageEmbed()
                .setTitle(`Configuration Giveaway`)
                .setColor(config.color)
                .addFields(
                    { name: `Durée`, value: `${db.get(`dure${message.guild.id}`) == null ? 'Non définit' : `${ms(db.get(`dure${message.guild.id}`)).replace("d", "j")}`}` },
                    { name: 'Salon', value: `${db.get(`channel${message.guild.id}`) === null ? message.channel : `<#${db.get(`channel${message.guild.id}`)}>`}` },
                    { name: "Réaction", value: `${db.get(`reactgv${message.guild.id}`) === null ? ":tada:" : `${db.get(`reactgv${message.guild.id}`)}`}` },
                    { name: "Gain", value: `${db.get(`gain${message.guild.id}`) === null ? "Non définit" : `${db.get(`gain${message.guild.id}`)}`}` },
                    { name: "Gagnants", value: `${db.get(`winnergv${message.guild.id}`) === null ? 1 : `${db.get(`winnergv${message.guild.id}`)}`}` }
                )

                let menuoptions = [

                    { value: "Modifier la durée", description: "", emoji: "🕙" },
                    { value: "Modifier le salon", description: "", emoji: "🏷️" },
                    { value: "Modifier le nombre de gagnants", description: "", emoji: "👤" },
                    { value: "Modifier la réaction", description: "", emoji: "⭐" },
                    { value: "Modifier le gain", description: "", emoji: "🎁" },
                    { value: "Validé", description: "Lancer le giveaway", emoji: "✅" }
        
        
                ]
            let interactiveButtons = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Fais un choix')
                .setOptions(menuoptions.map(option => ({
                    label: option.value,
                    value: option.value,
                    description: option.description,
                    emoji: option.emoji

                })))

            message.edit({
                embeds: [embed], components: [
                    new MessageActionRow().setComponents([interactiveButtons])]
            })
        }


        const embed = new MessageEmbed()
            .setTitle(`Configuration Giveaway`)
            .setColor(config.color)
            .addFields(
                { name: `Durée`, value: `${db.get(`dure${message.guild.id}`) == null ? 'Non définit' : `${ms(db.get(`dure${message.guild.id}`)).replace("d", "j")}`}` },
                { name: 'Salon', value: `${db.get(`channel${message.guild.id}`) === null ? message.channel : `<#${db.get(`channel${message.guild.id}`)}>`}` },
                { name: "Réaction", value: `${db.get(`reactgv${message.guild.id}`) === null ? ":tada:" : `${db.get(`reactgv${message.guild.id}`)}`}` },
                { name: "Gain", value: `${db.get(`gain${message.guild.id}`) === null ? "Non définit" : `${db.get(`gain${message.guild.id}`)}`}` },
                { name: "Gagnants", value: `${db.get(`winnergv${message.guild.id}`) === null ? 1 : `${db.get(`winnergv${message.guild.id}`)}`}` }
            )

        let menuoptions = [

            { value: "Modifier la durée", description: "", emoji: "🕙" },
            { value: "Modifier le salon", description: "", emoji: "🏷️" },
            { value: "Modifier le nombre de gagnants", description: "", emoji: "👤" },
            { value: "Modifier la réaction", description: "", emoji: "⭐" },
            { value: "Modifier le gain", description: "", emoji: "🎁" },
            { value: "Validé", description: "Lancer le giveaway", emoji: "✅" }


        ]
        let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Fais un choix')
            .setOptions(menuoptions.map(option => ({
                label: option.value,
                value: option.value,
                description: option.description,
                emoji: option.emoji

            })))

        message.channel.send({
            embeds: [embed], components: [
                new MessageActionRow().setComponents([interactiveButtons])]
        }).then(async m => {
            setTimeout(() => {
                m.edit({
                    compontents: [], embeds: [new MessageEmbed()
                        .setTitle(`Configuration Giveaway`)
                        .setColor(config.color)
                        .addFields(
                            { name: `Durée`, value: `${db.get(`dure${message.guild.id}`) == null ? 'Non définit' : `${ms(db.get(`dure${message.guild.id}`)).replace("d", "j")}`}` },
                            { name: 'Salon', value: `${db.get(`channel${message.guild.id}`) === null ? message.channel : `<#${db.get(`channel${message.guild.id}`)}>`}` },
                            { name: "Réaction", value: `${db.get(`reactgv${message.guild.id}`) === null ? ":tada:" : `${db.get(`reactgv${message.guild.id}`)}`}` },
                            { name: "Gain", value: `${db.get(`gain${message.guild.id}`) === null ? "Non définit" : `${db.get(`gain${message.guild.id}`)}`}` },
                            { name: "Gagnants", value: `${db.get(`winnergv${message.guild.id}`) === null ? 1 : `${db.get(`winnergv${message.guild.id}`)}`}` },

                        )]
                })
            }, 60000 * 5)


         
         

            client.on("interactionCreate", async (i) => {
                if(i.user.id !== message.author.id) return;
                let filter2 = (m) => m.author.id == message.author.id;
                if (!i.isSelectMenu()) return;
                if (i.values[0] === "Modifier la durée") {
                  
             
                    let question1 = await i.reply(`Quel est **la nouvelle durée du giveaway** ?`)
                    let durerecup = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000
                    })
                    let msg = await durerecup.first()
                    if (!msg.content.endsWith("d") && !msg.content.endsWith("j") && !msg.content.endsWith("h") && !msg.content.endsWith("m") && !msg.content.endsWith("s")) return message.channel.send(`Temps incorrect.`)
                    db.set(`dure${message.guild.id}`, ms(msg.content.replace("j", "d")))
          
                    await msg.delete()
                    updateembed(m)

                } else if (i.values[0] == 'Modifier le salon') {
                 
                    let question2 = await i.reply(`Quel est **le nouveau salon du giveaway** ?`)
                    let durerecup = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000
                    })
                    let msg = await durerecup.first()
                    let channel = msg.mentions.channels.first() || message.guild.channels.cache.get(msg.content)
                    if (!channel) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\``)
                    db.set(`channel${message.guild.id}`, channel.id)
                 
                   await  msg.delete()
                    updateembed(m)
                } else if (i.values[0] == 'Modifier la réaction') {
                  
                
                    let question3 = await i.reply(`Quel est **la réaction** ?`)
                    let durerecup = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000
                    })
                    var msg =await  durerecup.first();
                 await   durerecup.first().react(msg.content).then(() => {
                        db.set(`reactgv${message.guild.id}`, msg.content)
                        db.delete(`2reactgv${message.guild.id}`)
                        if (Util.parseEmoji(msg.content).id) db.set(`2reactgv${message.guild.id}`, Util.parseEmoji(msg.content).id)
             
                       msg.delete()
                        updateembed(m)

                    })
                } else if (i.values[0] == "Modifier le nombre de gagnants") {
                   
             
                    let question4 = await i.reply(`Quel est **le nouveau nombre gagnants** ?`)
                    let durerecup = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000
                    })
                    var msg = await durerecup.first()
                    if (isNaN(msg.content)) return message.channel.send(`Aucun nombre valide trouvé pour \`${msg.content}\``)
                    db.set(`winnergv${message.guild.id}`, msg.content)
            
                    msg.delete()
                    updateembed(m)

                } else if (i.values[0] == "Modifier le gain") {
                   
                    let question5 = await i.reply(`Quel est **le nouveau gain** ?`)
                    let durerecup = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000
                    })
                    var msg =await  durerecup.first()
                    db.set(`gain${message.guild.id}`, msg.content)
              
                   await msg.delete()
                    updateembed(m)


                } else if (i.values[0] == "Validé") {
                
                  let color = config.color
                  var channel = message.guild.channels.cache.get(db.get(`channel${message.guild.id}`)) || message.guild.channels.cache.get(message.channel.id)
                  if(!channel) return message.channel.send(`Aucun salon trouvé pour \`le giveaway\``)
                  if(db.get(`dure${message.guild.id}`) === null) return message.channel.send(`Aucune durée trouvé pour \`le giveaway\``)
                  if(db.get(`gain${message.guild.id}`) === null) return message.channel.send(`Aucune gain trouvé pour \`le giveaway\``)

                 i.reply(`Giveaway crée`)
              
                 var timestamp = Date.now() + db.get(`dure${message.guild.id}`)
         
                  var embed = new MessageEmbed()
                  .setTitle(db.get(`gain${message.guild.id}`))
                  .setDescription(`Réagissez avec ${db.get(`reactgv${message.guild.id}`) === null?   ":tada:":`${db.get(`reactgv${message.guild.id}`)}`} pour participer!\n*Nombre de gagnants : ${db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`}*`)
                  .addField(`Temps restant`, `${duration(db.get(`dure${message.guild.id}`))}`)
                     .setColor(color)
                  .setFooter(`Fin`)
                  .setTimestamp(timestamp)
                  var msg = await channel.send({embeds :[embed]}) 
            
                  msg.react(`${db.get(`reactgv${message.guild.id}`) === null ? `🎉`: `${db.get(`reactgv${message.guild.id}`)}` }`)
                  client.on("messageReactionAdd", async (reaction, user) => {
                      let react = ""
                      if(!db.get(`reactgv${message.guild.id}`)) react = reaction.id
                      if(!db.get(`2reactgv${message.guild.id}`)) react = reaction.name
                       if(react === db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`)) {

                          if(message.guild.roles.cache.get(db.get(`roleobliga${message.guild.id}`)) && !message.guild.members.cache.get(user.id).roles.cache.has(db.get(`roleobliga${message.guild.id}`))) reaction.users.remove(user.id)
                      }
                  })
                  setInterval(async () => { 
                      let ttm = duration(timestamp - Date.now())
                      if(!ttm.includes("-")) {
                      var slm = new MessageEmbed()
                      .setTitle(db.get(`gain${message.guild.id}`))
                      .setDescription(`Réagissez avec ${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`reactgv${message.guild.id}`) } pour participer!\n*Nombre de gagnants : ${db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`}*`)
                      .addField(`Temps restant`, `${ttm}`)
                      .setColor(color)
                      .setFooter(`Fin`)
                      .setTimestamp(timestamp)
                  await msg.edit({embeds : [slm]})}
          
                   },5000)
                  setTimeout(() => {
           
             
                      db.set(`last${message.guild.id}`, msg.id)
                      let winner = false
         
                  if(db.get(`imposer${message.guild.id}`) !== null) {
                      winner = message.guild.members.cache.get(db.get(`imposer${message.guild.id}`))
                      if(!winner) return winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                  } else if(db.get(`presencevocal${message.guild.id}`) === true) {
                      winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.voice && !u.bot ).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                  } else {
                      winner = msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).users.cache.filter((u) => !u.bot).random(Math.min(db.get(`winnergv${message.guild.id}`) === null?   1:`${db.get(`winnergv${message.guild.id}`)}`, msg.reactions.cache.get(`${db.get(`reactgv${message.guild.id}`) === null ? "🎉": db.get(`2reactgv${message.guild.id}`) === null ?  db.get(`reactgv${message.guild.id}`):db.get(`2reactgv${message.guild.id}`) }`).count));
                  }
                  if(!winner) return message.channel.send(`Aucun participant valide`)
                  var embed = new MessageEmbed()
                  .setTitle(db.get(`gain${message.guild.id}`))
                  .setDescription(`
Gagnant: ${winner}
Crée par: ${message.author}`)
                     .setColor(color)
                  .setFooter(`Finis`)
                  .setTimestamp(Date.now())
                  msg.edit({embeds : [embed]})

                  channel.send(`Félicitation à ${winner} qui gagne ${db.get(`gain${message.guild.id}`)}`)
                  }, db.get(`dure${message.guild.id}`));
              }
            }
            )
        })

    }

        
    }



}
function duration(mss) {
    const sec = Math.floor((mss / 1000) % 60).toString()
    const min = Math.floor((mss / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()
    return `${days.padStart(2, '') == "0" ? "" : `${days.padStart(2, '')} jours, `}${hrs.padStart(2, '') == "0" ? "" : `${hrs.padStart(2, '')} heures, `}${min.padStart(2, '') == "0" ? "" : `${min.padStart(2, '')} minutes et `}${sec.padStart(2, '')} secondes`
}