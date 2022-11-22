const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "leave",
  helpname : "leave settings",
  emoji: "🎭",
  description: "Permet de configurer les paramètres de leave",

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


        if (db.get(`leavestyle_${message.guild.id}_${message.id}`) === "message" || db.get(`leavestyle_${message.guild.id}_${message.id}`) === null) {
          const embed = new MessageEmbed()
            .setTitle(`Configuration Leave`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Salon de leave", db.get(`leavechannelmessage_${msg.guild.id}`) === null ? "Aucun" : `<#${db.get(`leavechannelmessage_${msg.guild.id}`)}> (${db.get(`leavechannelmessage_${msg.guild.id}`)})`)
            .addField("Message de leave", db.get(`leavemessage_${msg.guild.id}`) === null ? db.get(`leavemessageembed_${message.guild.id}`) === null ? "Default" : "Embed" : `${db.get(`leavemessage_${msg.guild.id}`)}`)



          let menuoptions = [
            { value: "Style Embed", description: "", emoji: "📑" },
            { value: "Modifier le salon de leave", description: "", emoji: "🏷️" },
            { value: "Supprimer le salon de leave", description: "", emoji: "🛎️" },
            { value: "Modifier le message de leave", description: "", emoji: "📩" },
            { value: "Supprimer le message de leave", description: "", emoji: "✉️" },

          ]
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
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
          let butt = new MessageActionRow().addComponents(bt2)
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [ select,butt] })
        } else if (db.get(`leavestyle_${message.guild.id}_${message.id}`) === "embed") {


          const embed = new MessageEmbed()
            .setTitle(`Configuration Leave`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Salon de leave", db.get(`leavechannelmessage_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`leavechannelmessage_${msg.guild.id}`)}> (${db.get(`leavechannelmessage_${msg.guild.id}`)})`)
            .addField("Embed de leave", db.get(`leavemessage_${msg.guild.id}`) === null ? db.get(`leavemessageembed_${message.guild.id}`) === null ? "Non" : "Oui" : `Message: ${db.get(`leavemessage_${msg.guild.id}`)}`)
           
           



          let menuoptions = [
            { value: "Style Message", description: "", emoji: "📑" },
            { value: "Modifier le salon de leave", description: "", emoji: "🏷️" },
            { value: "Supprimer le salon de leave", description: "", emoji: "🛎️" },
            { value: "Modifier l'embed de leave", description: "", emoji: "📩" },
            { value: "Supprimer l'embed de leave", description: "", emoji: "✉️" },

          ]
          const bt1 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcomemsg")
            .setEmoji("📝")
            .setLabel("Voir l'embed de leave")
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
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
          let butt = new MessageActionRow().addComponents([bt1, bt2])
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [ select,butt] })
        }
      }




      message.channel.send(`Prêt`).then(async m => {
        updateembed(m)
        setTimeout(() => {
          m.edit({
            components: [], embeds: [new MessageEmbed()
              .setTitle(`Configuration Leave`)
              .setColor(color)
              .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
              .addField("Salon de leave", db.get(`leavechannelmessage_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`leavechannelmessage_${message.guild.id}`)}> (${db.get(`leavechannelmessage_${message.guild.id}`)})`)
              .addField("Message de leave", db.get(`leavemessage_${message.guild.id}`) === null ? db.get(`leavemessageembed_${message.guild.id}`) === null ? "Default" : "Embed" : `${db.get(`leavemessage_${message.guild.id}`)}`)
  ]
          })
          // message.channel.send(embeds)
        }, 60000 * 5)
        const client = require("../../index")
        client.on('interactionCreate', async (i) => {
          if (!i.isButton()) return;
          if (i.user.id  !==  message.author.id) return i.reply({content : "Tu n'as pas  le droit d'utiliser cette interaction",ephemeral : true})
          if (i.customId == message.id + "welcomemsg") {
            i.deferUpdate()
            if (db.get(`leavemessageembed_${message.guild.id}`) !== null) {
              message.channel.send({ embeds: [db.get(`leavemessageembed_${message.guild.id}`)] })
            }
          }
          if (i.customId === message.id + "welcome") {
            i.deferUpdate()

            updateembed(m)
          }

        })
        client.on('interactionCreate', async (i) => {
          if (!i.isSelectMenu()) return;
           const filter = m => message.author.id === m.author.id;
           if (i.user.id  !==  message.author.id) return i.reply({content : "Tu n'as pas  le droit d'utiliser cette interaction",ephemeral : true})
          switch (i.values[0]) {
            case message.id + "Style Embed":
              i.deferUpdate()
              db.set(`leavestyle_${message.guild.id}_${message.id}`, "embed")

              updateembed(m)
              break
            case message.id + "Style Message":
              i.deferUpdate()
              db.set(`leavestyle_${message.guild.id}_${message.id}`, "message")
              updateembed(m)
              break
            case message.id + "Modifier l'embed de leave":
              i.deferUpdate()
              db.set(`leavemessage_${message.guild.id}`, null)
              embedmsg(m)
              break

            case message.id + "Supprimer l'embed de leave":
              i.deferUpdate()
              db.set(`leavemessageembed_${message.guild.id}`, null)
              updateembed(m)
              break
            case message.id + "Modifier le greet message":
              i.deferUpdate()
              message.channel.send(`Au bout de combien de temps **doit se supprimer le message d'arrivée ?** (*15m max*)`).then(mp => {
                mp.channel.awaitMessages(
                   { 
                    filter : filter,
                    max: 1, 
                    time: 60000, 
                    errors: ['time'] })
                  .then(cld => {

                    var msg = cld.first();
                    if (!msg.content.endsWith("m") && !msg.content.endsWith("s")) return message.channel.send(`Format invalide`)


                    db.set(`joinmsgdel_${message.guild.id}`, msg.content)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer le greet message":
              i.deferUpdate()
              db.set(`joinmsgdel_${message.guild.id}`, null)
              updateembed(m)
              break
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
            case message.id + "Modifier le salon de leave":
              i.deferUpdate()
              message.channel.send(`Quel est **le nouveau salon de leave** ?`).then(mp => {
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

                    db.set(`leavechannelmessage_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer le salon de leave":
              i.deferUpdate()
              db.delete(`leavechannelmessage_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier le message de leave":
              i.deferUpdate()
              let embed = new MessageEmbed()
              .setColor(color)
              .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
              .addField(`Informations sur l'utilisateur : `,
              `Mention de l'user : {user}
              Id de l'user : {user:id}
              Tag de l'user : {user:tag}
              Nom de l'user : {user:name}`)
              .addField("Informations sur l'inviteur : ", 
              `Mention de l'inviteur : {inviter}
              Id de l'inviteur : {inviter:id}
              Tag de l'inviteur : {inviter:tag}
              Nom de l'inviteur : {inviter:name}
              Nombre d'invitations : {invite}`)
              .addField("Informations sur le serveur : ", 
              `Membres totaux : {guild:member}
              Serveur : {guild:name}`)
              message.channel.send({embeds : [embed]})
             message.channel.send("Quel est **le nouveau message de leave** ?")
.then(mp => {
  mp.channel.awaitMessages(
    { 
     filter : filter,
     max: 1, 
     time: 60000, 
     errors: ['time'] })
                  .then(cld => {

                    var msg = cld.first();
                    db.set(`leavemessageembed_${message.guild.id}`, null)
                    db.set(`leavemessage_${message.guild.id}`, msg.content)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })

              break
            case message.id + "Supprimer le message de leave":
              i.deferUpdate()
              db.delete(`leavemessage_${message.guild.id}`)
              updateembed(m)
              break
            case message.id + "Modifier le MP de leave":
              i.deferUpdate()
              let embeds = new MessageEmbed()
              .setColor(color)
              .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
              .addField(`Informations sur l'utilisateur : `,`Mention de l'user : {user}
              Id de l'user : {user:id}
              Tag de l'user : {user:tag}
              Nom de l'user : {user:name}`)
              .addField("Informations sur le serveur : ", `Membres totaux : {guild:member}
              Serveur : {guild:name}`)
              message.channel.send({embeds : [embeds]})
              message.channel.send("Quel est **le DM salon de leave** ?"
 
).then(mp => {
  mp.channel.awaitMessages(
    { 
     filter : filter,
     max: 1, 
     time: 60000, 
     errors: ['time'] })
                  .then(cld => {

                    var msg = cld.first();


                    db.set(`joindmee_${message.guild.id}`, msg.content)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case message.id + "Supprimer le MP de leave":
              i.deferUpdate()
              db.delete(`joindmee_${message.guild.id}`)
              updateembed(m)
              break
          }

        })
      })


      async function embedmsg(m) {
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
        const embedbase = new MessageEmbed()
          .setDescription("** **")
        let interactiveButtons = new MessageSelectMenu()
          .setCustomId(message.id + 'MenuSelection')
          .setMaxValues(1)
          .setMinValues(1)
          .setPlaceholder('Faix un choix')
          .setOptions(menuoptions.map(option => ({
            label: option.value,
            value: message.id +  option.value,
            description: option.description,
            emoji: option.emoji,


          })
          ))
        const bt = new MessageButton()
        .setStyle("SUCCESS")
          .setCustomId("embedmsg1" + message.id)
          .setEmoji("✅")
          .setLabel("Valider")
        const bt3 = new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId("embedmsg3" + message.id)
          .setEmoji("❌")
          .setLabel("Re formuler votre choix")
        let butt = new MessageActionRow().addComponents([bt, bt3])
        let select = new MessageActionRow().addComponents(interactiveButtons)
        let embed = new MessageEmbed()
        .setColor(color)
        .addField(`Informations sur l'utilisateur : `,`Mention de l'user : {user}
        Id de l'user : {user:id}
        Tag de l'user : {user:tag}
        Nom de l'user : {user:name}`)
        .addField("Informations sur l'inviteur : ", `Mention de l'inviteur : {inviter}
        Id de l'inviteur : {inviter:id}
        Tag de l'inviteur : {inviter:tag}
        Nom de l'inviteur : {inviter:name}
        Nombre d'invitations : {invite}`)
        .addField("Informations sur le serveur : ", `Membres totaux : {guild:member}
        Serveur : {guild:name}`)
        message.channel.send({
          embeds: [embed,embedbase], components: [butt, select]
        }).then(async msgg => {
          setTimeout(() => {
            msgg.delete()
            // message.channel.send(embeds)
          }, 60000 * 15)
          client.on('interactionCreate', async (i) => {
            if (!i.isButton()) return;
            if (message.author.id !== i.user.id) return;
            if (i.customId === "embedmsg1" + message.id) {
              i.deferUpdate()
              db.set(`leavemessageembed_${message.guild.id}`, msgg.embeds[0])
              msgg.delete()
              updateembed(m)
            }
            if (i.customId === "embedmsg3" + message.id) {
              i.deferUpdate()
              msgg.edit(msgg.embeds)
            }
          })
          client.on("interactionCreate", async (i) => {
            if(!i.isSelectMenu()) return;
            if (message.author.id !== i.user.id) return;
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
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier le Titre !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer le titre":
                i.deferUpdate()
                embedbase.setTitle("** **")
                msgg.edit({ embeds: [embedbase] })
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
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier la description !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer la description":
                i.deferUpdate()
                embedbase.setDescription("** **")
                msgg.edit({ embeds: [embedbase] })
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
                  if (collected.first().mentions.users.size <= 0) {
                    auteur = collected.first().content;
                    const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Author, sinon entrez `non`");
                    const auteurImg = (await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })).first();
                    question2.delete();
                    auteurImg.delete();
                    const img = auteurImg.content
                    const liens = [
                      "https://",
                      "http://",
                      "https",
                      "http"
                    ];
                    if (!liens.some(word => img.includes(word))) {
                      embedbase.setAuthor(auteur)
                      message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar a votre Author ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 }))
                    }

                    if (liens.some(word => img.includes(word))) {
                      embedbase.setAuthor(auteur, auteurImg.content)
                    }
                  }
                  if (collected.first().mentions.users.size > 0) {
                    auteur = collected.first().mentions.users.first();

                    embedbase.setAuthor({ name: auteur.username, iconURL: auteur.displayAvatarURL({ dynamic: true }) });
                  }
                  msgg.edit({ embeds: [embedbase] })
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

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()

                  collected.first().delete()
                  TDCQUEST2.delete()
                  if (collected.first().mentions.users.size <= 0) {
                    footer = collected.first().content;
                    const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Footer, sinon entrez `non`");
                    const footerImg = (await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })).first();
                    question2.delete();
                    footerImg.delete();
                    const img = footerImg.content
                    const liens = [
                      "https://",
                      "http://",
                      "https",
                      "http"
                    ];
                    if (!liens.some(word => img.includes(word))) {
                      embedbase.setFooter(footer)
                      message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar au Footer ou le lien n'est pas Valide !").then((mm) => mm.delete({ timeout: 2500 }))
                    }

                    if (liens.some(word => img.includes(word))) {
                      embedbase.setFooter(footer, footerImg.content)
                    }
                  }
                  if (collected.first().mentions.users.size > 0) {
                    footer = collected.first().mentions.users.first();

                    embedbase.setFooter(footer.username, footer.displayAvatarURL({ dynamic: true }));
                  }
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier le Footer !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })

                break

              case message.id + "Supprimer le footer":
                i.deferUpdate()
                embedbase.setFooter("** **")
                msgg.edit({ embeds: [embedbase] })
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
                  if (!liens.some(word => thumbnail.includes(word))) {
                    collected.first().delete()
                    PASDETDCMEC.delete()
                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 }))
                  }


                  collected.first().delete()
                  PASDETDCMEC.delete()
                  embedbase.setThumbnail(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
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

                message.channel.awaitMessages({
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
                  if (!liens.some(word => image.includes(word))) {
                    collected.first().delete()
                    heh1.delete()
                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 }))
                  }


                  collected.first().delete()
                  heh1.delete()
                  embedbase.setImage(collected.first().content, { size: 4096 })
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier l'Image !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer l'image":
                i.deferUpdate()
                embedbase.setImage("htps://slm.com")
                msgg.edit({ embeds: [embedbase] })
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
                  if (!liens.some(word => url.includes(word))) {
                    collected.first().delete()
                    WASSIMLEMAITRE.delete()
                    return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({ timeout: 2500 }))
                  }


                  collected.first().delete()
                  WASSIMLEMAITRE.delete()
                  embedbase.setURL(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
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

                message.channel.awaitMessages({
                  filter,
                  max: 1,
                  time: 60000,
                  errors: ['time']
                }).then(async (collected) => {
                  const lowercase = collected.first().content.toLowerCase()


                  collected.first().delete()
                  HEHEHHE.delete()
                  embedbase.setColor(collected.first().content)
                  msgg.edit({ embeds: [embedbase] })
                }).catch(async (err) => {

                  message.channel.send("**Désolé mais je ne peux pas modifier la Couleur !**").then((mm) => mm.delete({
                    timeout: 2500
                  }));
                })
                break

              case message.id + "Supprimer la couleur":
                i.deferUpdate()
                embedbase.setColor("WASSIM")
                msgg.edit({ embeds: [embedbase] })
                break



              case message.id + "Copier un embed":
                i.deferUpdate()
                const channID = await message.channel.send("Quel est **le salon ou ce trouve le message à copier ?** (*ID*)");
                const channel_id = (await message.channel.awaitMessages({ filter: filterMessage, max: 1, time: 60000 })).first();
                channID.delete();
                channel_id.delete();
                if (!Number(channel_id.content) || !message.guild.channels.cache.get(channel_id.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({ timeout: 5000 }));
                const msgQuestionMessageID = await message.channel.send("Quel est **le message de l'embed à copier ?** (*Une ID*)");
                const message_id = (await message.channel.awaitMessages({ filter: filterMessage, max: 1, time: 60000 })).first();
                msgQuestionMessageID.delete();
                message_id.delete();
                if (!Number(message_id.content) || !message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({ timeout: 5000 }));
                const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
                if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({ timeout: 50000 }));
                if (msg.partial) {
                  try {
                    await msg.fetch()
                  } catch {
                    return
                  }
                }
                msgg.edit({ embeds: [msg.embeds[0].toJSON()] })

                break


            }
          })


        })
      }
    }
  }
}