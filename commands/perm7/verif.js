const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton,Util } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "verif",
  helpname : "verif settings",
  emoji: "🎭",
  description: "Permet de configurer les paramètres de vérification",

  /**
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

    if (args[0] == "settings") {

      function updateembed(msg) {


      
          const embed = new MessageEmbed()
            .setTitle(`Configuration Verif`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Rôle membre", db.get(`autorole_${message.guild.id}`) === null ? "Aucun" : `<@&${db.get(`autorole_${message.guild.id}`)}> (${db.get(`autorole_${message.guild.id}`)})`)
            .addField("Réaction", db.get(`verifreac_${msg.guild.id}`) === null ? "Aucun" : `${db.get(`verifreac_${msg.guild.id}`)}`)
            .addField("Salon de vérif", db.get(`verifchannel_${msg.guild.id}`) === null ? "Aucun" :  `<#${db.get(`verifchannel_${message.guild.id}`)}>`)
            .addField("Message de verif", db.get(`verifmess_${msg.guild.id}`) === null ? "Aucun" : `${db.get(`verifmess_${msg.guild.id}`)}`)



          let menuoptions = [
            { value: "Modifier l'autorole", description: "", emoji: "👤" },
            { value: "Supprimer l'autorole", description: "", emoji: "👥" },
            { value: "Modifier le message de vérification", description: "", emoji: "🏷️" },
            { value: "Supprimer le message de vérification", description: "", emoji: "🛎️" },
            { value: "Modifier la réaction", description: "", emoji: "📩" },
            { value: "Supprimer la réaction", description: "", emoji: "✉️" },

          ]
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            const bt = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId(message.id + "valider")
            .setEmoji("✅")
            .setLabel("Valider")
          let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Faix un choix')
            .setOptions(menuoptions.map(option => ({
              label: option.value,
              value: message.id +  option.value,
              description: option.description,
              emoji: option.emoji

            })))
          let butt = new MessageActionRow().addComponents(bt,bt2)
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [ select,butt] })
        
      }




      message.channel.send(`Prêt`).then(async m => {
        updateembed(m)
        setTimeout(() => {
          m.edit({
            components: [], embeds: [
                new MessageEmbed()
                .setTitle(`Configuration Verif`)
                .setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                .addField("Rôle membre", db.get(`autorole_${message.guild.id}`) === null ? "Aucun" : `<@&${db.get(`autorole_${message.guild.id}`)}> (${db.get(`autorole_${message.guild.id}`)})`)
                .addField("Réaction", db.get(`verifreac_${msg.guild.id}`) === null ? "Aucun" : db.get(`verifreac_${msg.guild.id}`))
                .addField("Salon de vérif", db.get(`verifchannel_${msg.guild.id}`) === null ? "Aucun" :  `<#${db.get(`verifchannel_${message.guild.id}`)}>`)
                .addField("Message de verif", db.get(`verifmess_${msg.guild.id}`) === null ? "Aucun" : `${db.get(`verifmess_${msg.guild.id}`)}`)]
    
          })
          // message.channel.send(embeds)
        }, 60000 * 5)
        const client = require("../../index")
        client.on('interactionCreate', async (i) => {
          if (!i.isButton()) return;
          if (i.user.id !== message.author.id) return i.reply({content : "Vous n'êtes pas autorisé a utilisé cette interaction",ephemeral : true})
          if (i.customId === message.id + "welcome") {
            i.deferUpdate()

            updateembed(m)
          }
          if(i.customId === message.id + "valider"){
            let msg = message
            i.deferUpdate()
            if(db.get(`verifreac_${msg.guild.id}`) === null) return message.channel.send("Aucune réaction est configuré")
            if(db.get(`verifmess_${msg.guild.id}`) === null ) return message.channel.send("Aucun message est configuré")
           
       let role = message.guild.roles.cache.get(db.get(`autorole_${msg.guild.id}`))
       if(!role) return message.channel.send("Aucun rôle membre est configuré")
        let   channel =   message.guild.channels.cache.get(db.get(`verifchannel_${msg.guild.id}`))
        if(!channel) return message.channel.send("Aucun salon est configuré")
        if(message.guild.channels.cache.get(channel.id).messages.fetch(db.get(`verifmess_${msg.guild.id}`)) == null)return message.channel.send("Aucun message est configuré")
            message.guild.channels.cache.get(channel.id).messages.fetch(db.get(`verifmess_${msg.guild.id}`)).then((m)=> {
                m.react(db.get(`verifreac_${msg.guild.id}`))

                db.push(`verification_${message.guild.id}`, {
                    msg: db.get(`verifmess_${msg.guild.id}`),
                    channel: channel.id,
                    emoji: db.get(`verifreac_${message.guild.id}`),
                    roleId: role.id
                });
           
                message.channel.send("Valider")
            })

          }

        })
        client.on('interactionCreate', async (i) => {
          if (!i.isSelectMenu()) return;
           const filter = m => message.author.id === m.author.id;
           if (i.user.id !== message.author.id) return i.reply({content : "Vous n'êtes pas autorisé a utilisé cette interaction",ephemeral : true})
          switch (i.values[0]) {
            case message.id + "Modifier l'autorole":
              i.deferUpdate()
              message.channel.send(`Quel est **le nouveau rôle membre** ?`).then(mp => {
                mp.channel.awaitMessages(
                  { 
                   filter : filter,
                   max: 1, 
                   time: 60000, 
                   errors: ['time'] })
                  .then(cld => {

                    var msg = cld.first();
                    var role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\`.`);

                    db.set(`autorole_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer l'autorole":
              i.deferUpdate()
              db.delete(`autorole_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier le message de vérification":
              i.deferUpdate()
              message.channel.send(`Dans quel salon **se situe le message de verification ** ?`).then(mp => {
                mp.channel.awaitMessages(
                  { 
                   filter : filter,
                   max: 1, 
                   time: 60000, 
                   errors: ['time'] })
                  .then(cld => {
                    var msg = cld.first();
                    var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                    if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

                    db.set(`verifchannel_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)
                    message.channel.send(`Quel est **l'id du message dans ${role} ** ?`).then(mp => {
                        mp.channel.awaitMessages(
                          { 
                           filter : filter,
                           max: 1, 
                           time: 60000, 
                           errors: ['time'] })
                          .then(cld => {
                            var msg = cld.first();
                            var message = role.messages.fetch(msg.content)
                            console.log(message)
                            if (!message) return message.channel.send(`Aucun message trouvé pour \`${msg.content}\`.`);
        
                            db.set(`verifmess_${i.guild.id}`, msg.content)
                            mp.delete()
                            cld.first().delete()
                            updateembed(m)
                            
        
                          });
                      })


                  });
              })
              break
            case message.id + "Supprimer le message de vérification":
              i.deferUpdate()
              db.delete(`verifmess_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier la réaction":
              i.deferUpdate()
message.channel.send("Quel est **la nouvelle réaction** ?").then(mp => {
  mp.channel.awaitMessages(
    { 
     filter : filter,
     max: 1, 
     time: 60000, 
     errors: ['time'] })
                  .then(cld => {
                    var msg = cld.first();
                    let emoji = msg.content.toString()
                    message.react(emoji).then(()=> {
                        db.set(`verifreac_${message.guild.id}`, emoji)
                        updateembed(m)
                    }).catch(e=> {message.channel.send("Je n'ai pas **accès a cet émoji**")})
                  //  db.set(`verifreac_${message.guild.id}`, emoji)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })

              break
            case message.id + "Supprimer la réaction":
              i.deferUpdate()
              db.delete(`verifreac_${message.guild.id}`)
              updateembed(m)
              break
            }
        })
    })
}

  }
}