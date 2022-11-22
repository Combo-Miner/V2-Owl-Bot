const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton, MessageFlags } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "ticket",
  helpname : "ticket settings",
  emoji: "🎭",
  description: "Permet de configurer les paramètres de tickets",

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

        if (db.get(`ticketstyle_${message.guild.id}`) === "message" || db.get(`ticketstyle_${message.guild.id}`) === null) {
          const embed = new MessageEmbed()
            .setTitle(`Configuration Ticket`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Rôle s'occupant du ticket ", db.get(`ticketrole_${message.guild.id}`) === null ? "Aucun" : `<@&${db.get(`ticketrole_${message.guild.id}`)}> (${db.get(`ticketrole_${message.guild.id}`)})`)
            .addField("Salon de ticket", db.get(`ticketchannel_${msg.guild.id}`) === null ? "Aucun" : `<#${db.get(`ticketchannel_${msg.guild.id}`)}> (${db.get(`ticketchannel_${msg.guild.id}`)})`)
            .addField("Style", db.get(`ticketstyle_${msg.guild.id}`) === null ? db.get(`ticketstyle_${message.guild.id}`) === null ? "Default" : "Modals" : `${db.get(`ticketstyle_${msg.guild.id}`)}`)



          let menuoptions = [
            { value: "Style Modals", description: "", emoji: "📑" },
            { value: "Modifier le rôle s'occupant du ticket", description: "", emoji: "👤" },
            { value: "Supprimer le rôle s'occupant du ticket", description: "", emoji: "👥" },
            { value: "Modifier le salon de ticket", description: "", emoji: "🏷️" },
            { value: "Supprimer le salon de ticket", description: "", emoji: "🛎️" },
            { value: "Modifier le message", description: "", emoji: "🏷️" },
            { value: "Supprimer le message", description: "", emoji: "🛎️" },
            { value: "Modifier l'embed de ticket", description: "", emoji: "📩" },
            { value: "Supprimer l'embed de ticket", description: "", emoji: "✉️" },

          ]
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            const bt3 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "ticket")
            .setEmoji("📑")
            .setLabel("Voir l'embed")
            const bt5 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "config")
            .setEmoji("🎯")
            .setLabel("Configurer le button")
            const bt4 = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId(message.id + "valide")
            .setEmoji("✅")
            .setLabel("Valider")
          let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Faix un choix')
            .setOptions(menuoptions.map(option => ({
              label: option.value,
              value: message.id + option.value,
              description: option.description,
              emoji: option.emoji

            })))
          let butt = new MessageActionRow().addComponents([bt3,bt2,bt5,bt4])
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [ select,butt] })
        } else if (db.get(`ticketstyle_${message.guild.id}`) === "modals") {


            const embed = new MessageEmbed()
            .setTitle(`Configuration Ticket`)
            .setColor(color)
            .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
            .addField("Rôle s'occupant du ticket ", db.get(`ticketrole_${message.guild.id}`) === null ? "Aucun" : `<@&${db.get(`ticketrole_${message.guild.id}`)}> (${db.get(`ticketrole_${message.guild.id}`)})`)
            .addField("Salon de ticket", db.get(`ticketchannel_${msg.guild.id}`) === null ? "Aucun" : `<#${db.get(`ticketchannel_${msg.guild.id}`)}> (${db.get(`ticketchannel_${msg.guild.id}`)})`)
            .addField("Style", db.get(`ticketstyle_${msg.guild.id}`) === null ? db.get(`ticketstyle_${message.guild.id}`) === null ? "Default" : "Modals" : `${db.get(`ticketstyle_${msg.guild.id}`)}`)
           



            let menuoptions = [
                { value: "Style Embed", description: "", emoji: "📑" },
                { value: "Modifier le rôle s'occupant du ticket", description: "", emoji: "👤" },
                { value: "Supprimer le rôle s'occupant du ticket", description: "", emoji: "👥" },
                { value: "Modifier le salon de ticket", description: "", emoji: "🏷️" },
                { value: "Supprimer le salon de ticket", description: "", emoji: "🛎️" },
                { value: "Modifier les questions", description: "", emoji: "📩" },
                { value: "Supprimer les questions", description: "", emoji: "✉️" },
    
              ]
          const bt1 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcomemsg")
            .setEmoji("📝")
            .setLabel("Voir les questions")
          const bt2 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "welcome")
            .setEmoji("❌")
            .setLabel("Re formuler votre choix")
            const bt5 = new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId(message.id + "config")
            .setEmoji("🎯")
            .setLabel("Configurer le button")
            const bt4 = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId(message.id + "valide")
            .setEmoji("✅")
            .setLabel("Valider")
          let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Faix un choix')
            .setOptions(menuoptions.map(option => ({
              label: option.value,
              value: message.id + option.value,
              description: option.description,
              emoji: option.emoji

            })))
          let butt = new MessageActionRow().addComponents([bt1, bt2,bt5,bt4])
          let select = new MessageActionRow().addComponents(interactiveButtons)
          msg.edit({ embeds: [embed], components: [ select,butt] })
        }
      }




      message.channel.send(`Prêt`).then(async m => {
        updateembed(m)
        setTimeout(() => {
            let msg= message
          m.edit({
            components: [], embeds: [new MessageEmbed()
                .setTitle(`Configuration Ticket`)
                .setColor(color)
                .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
                .addField("Rôle s'occupant du ticket ", db.get(`ticketrole_${message.guild.id}`) === null ? "Aucun" : `<@&${db.get(`ticketrole_${message.guild.id}`)}> (${db.get(`ticketrole_${message.guild.id}`)})`)
                .addField("Salon de ticket", db.get(`ticketchannel_${msg.guild.id}`) === null ? "Aucun" : `<#${db.get(`ticketchannel_${msg.guild.id}`)}> (${db.get(`ticketchannel_${msg.guild.id}`)})`)
                .addField("Style", db.get(`ticketstyle_${msg.guild.id}`) === null ? db.get(`ticketstyle_${message.guild.id}`) === null ? "Default" : "Modals" : `${db.get(`ticketstyle_${msg.guild.id}`)}`)
  ]
          })
          // message.channel.send(embeds)
        }, 60000 * 5)
        const client = require("../../index")
        client.on('interactionCreate', async (i) => {
          if (!i.isButton()) return;
          if (i.user.id !== message.author.id) return i.reply({content : "Vous n'êtes pas autorisé à utilisé cette interaction",ephemeral : true})
          if (i.customId == message.id + "welcomemsg") {
     
            const questw = db.get("ticketquest" + message.guild.id)
              if(!questw) {i.deferUpdate() 
                return message.channel.send("Vous avez configuré 0 questions")}
               const { Modal,TextInputComponent,showModal } = require('discord-modals'); 

const modal = new Modal() 
	.setCustomId(message.id + 'modal-customids')
	.setTitle('Modal')
	questw.map(r=> r.question).forEach(q=> modal.addComponents(new TextInputComponent()
    .setCustomId(q)
    .setLabel(q)
    .setStyle('LONG') 
    .setPlaceholder("Merci de répondre à la question")
    .setRequired(true)))
    showModal(modal, {
        client: client, 
        interaction: i, 
    });
    client.on('modalSubmit', async (modal) => {
        if (modal.customId == message.id + 'modal-customids') {
          let questionj =   modal.fields
          if(questionj == 0) return;
          questionj.forEach(f=> message.channel.send(`Donc a la quesiton ${f.customId} tu à répondu ${f.value}`))
            modal.reply(`Donc a la quesiton ${questionj} tu à répondu ${modal.fields.find(e=> e.customId == questionj).value}`)
       
       
            
            
           
        }
    });
          }
          if (i.customId === message.id + "welcome") {
            i.deferUpdate()

            updateembed(m)
          }
          if(i.customId === message.id + "ticket") {
            i.deferUpdate()
            if(db.get(`ticketembed_${message.guild.id}`) !== null) {
              i.message.edit({embeds : [db.get(`ticketembed_${message.guild.id}`)]})
            }
          }
          if(i.customId === message.id + "config") {
            i.deferUpdate()
            function updateem(message) { 
                let button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setLabel((db.get("ticket" + message.guild.id))  === null ? "✅" : db.get("ticket" + message.guild.id))
                    .setStyle((db.get("ticket_style" + message.guild.id) == null ? "PRIMARY" : db.get("ticket_style" + message.guild.id)))
                    .setCustomId("ticket"),
                   
                    
                )
        
                let menuoptions = [
        
                    { value: "Modifier le style", description: "", emoji: "✍" },
                    { value: "Modifier l'emoji", description: "", emoji: "⭐" },
        
        
                ]
        
                let menustyle = [
        
                    { value: "Rouge", description: "", emoji: "🔴" },
                    { value: "Bleu ", description: "", emoji: "🔵" },
                    {value : "Vert", description : "", emoji : "🟢"},
                    {value : "Gris", description : "", emoji : "⚫"}
        
        
                ]
        
                let interactiveButtons = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder('Fais un choix')
                .setOptions(menuoptions.map(option => ({
                    label: option.value,
                    value:  option.value,
                    description: option.description,
                    emoji: option.emoji
        
                })))
                let newStyle = new MessageSelectMenu()
                .setCustomId(message.id + "StyleSelection")
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Fais un choix")
                .setOptions(menustyle.map(option => ({
                    label: option.value,
                    value:  option.value,
                    description: option.description,
                    emoji: option.emoji
        
                })))
                let style = new MessageActionRow().addComponents(newStyle)
                let ez = new MessageActionRow().addComponents(interactiveButtons)
        
                message.edit({content : "Configuration",components: [ez,button]})
            }
        
        
            let button = new MessageActionRow().addComponents(
                new MessageButton()
                .setLabel((db.get("ticket" + message.guild.id))  === null ? "✅" : db.get("ticket" + message.guild.id))
                .setStyle((db.get("ticket_style" + message.guild.id) == null ? "PRIMARY" : db.get("ticket_style" + message.guild.id)))
                .setCustomId("ticket"),
               
                
            )
        
            let menuoptions = [
        
                { value: "Modifier le style", description: "", emoji: "✍" },
                { value: "Modifier l'emoji", description: "", emoji: "⭐" },
        
        
            ]
        
            let menustyle = [
        
                { value: "Rouge", description: "", emoji: "🔴" },
                { value: "Bleu", description: "", emoji: "🔵" },
                {value : "Vert", description : "", emoji : "🟢"},
                {value : "Gris", description : "", emoji : "⚫"}
        
        
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
            let newStyle = new MessageSelectMenu()
            .setCustomId(message.id + "StyleSelection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Fais un choix")
            .setOptions(menustyle.map(option => ({
                label: option.value,
                value: option.value,
                description: option.description,
                emoji: option.emoji
        
            })))
            let style = new MessageActionRow().addComponents(newStyle)
            let ez = new MessageActionRow().addComponents(interactiveButtons)
    
            message.channel.send({content : "Configuration",components: [ez,button]}).then(async m => {
                 setTimeout(()=> {
                  
                
                    let menuoptions = [
                
                        { value: "Modifier le style", description: "", emoji: "✍" },
                        { value: "Modifier l'emoji", description: "", emoji: "⭐" },
                
                
                    ]
                
                    let menustyle = [
                
                        { value: "Rouge", description: "", emoji: "🔴" },
                        { value: "Bleu", description: "", emoji: "🔵" },
                        {value : "Vert", description : "", emoji : "🟢"},
                        {value : "Gris", description : "", emoji : "⚫"}
                
                
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
                    let newStyle = new MessageSelectMenu()
                    .setCustomId(message.id + "StyleSelection")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Fais un choix")
                    .setOptions(menustyle.map(option => ({
                        label: option.value,
                        value:  option.value,
                        description: option.description,
                        emoji: option.emoji
                
                    })))
                    let style = new MessageActionRow().addComponents(newStyle)
                    let ez = new MessageActionRow().addComponents(interactiveButtons)
                    m.edit({components : [ez,style]})
                 }, 60000 * 5)
            
        
                client.on('interactionCreate', async (i) => {
                    if(!i.isSelectMenu()) return;
                    if (i.user.id !== message.author.id) return i.reply({content : "Vous n'êtes pas autorisé à utilisé cette interaction",ephemeral : true})
                    if(i.values[0] ==  "Modifier le style") {
                    i.deferUpdate()
                        i.message.edit({components : [style,button]})
                    }else if (i.values[0] == "Modifier l'emoji") {
                        i.deferUpdate()
                        let filter2 = (m) => m.author.id === message.author.id;
                        let question5 = await message.channel.send(`Quel **doit être le nouveau émoji** ?`)
                        let durerecup = await message.channel.awaitMessages({
                          filter: filter2,
                          max: 1,
                          time: 60000
                        })
                        var msg = durerecup.first().toString()
                        db.set("ticket" + message.guild.id,msg)
                    
                        question5.delete()
                       updateem(m)
        
                    } 
                    else if (i.values[0] ==   "Rouge") {
                        i.deferUpdate()
                        db.set("ticket_style" + message.guild.id, "DANGER")
                        updateem(m)
                    } else if (i.values[0] ==   "Vert") {
                        i.deferUpdate()
                        db.set("ticket_style" + message.guild.id, "SUCCESS")
                        updateem(m)
                    } else if (i.values[0] ==   "Gris") {
                        i.deferUpdate()
                        db.set("ticket_style" + message.guild.id, "PRIMARY")
                        updateem(m)
                    } else if(i.values[0] ==  "Bleu") {
                        i.deferUpdate()
                        db.set("ticket_style" + message.guild.id,"PRIMARY")
                        updateem(m)
        
                    }
                })
            })
            }
          if(i.customId == message.id + "valide"){
            i.deferUpdate()
            let channel = db.get("ticketchannel_" + message.guild.id)
            if(!channel) return message.channel.send("Vous n'avez configuré aucun salon")
            await message.channel.send("Au quel **message je dois attacher le button** ? (ID) ")
            .then(async mp => {
                mp.channel.awaitMessages(
                   { 
                    filter : (m) => m.author.id == message.author.id,
                    max: 1, 
                    time: 60000, 
                    errors: ['time'] })
                  .then(async cld => {
                    let bt = new MessageActionRow().setComponents(
                        new MessageButton()
                    .setLabel((db.get("ticket" + message.guild.id))  === null ? "✅" : db.get("ticket" + message.guild.id))
                    .setStyle((db.get("ticket_style" + message.guild.id) == null ? "PRIMARY" : db.get("ticket_style" + message.guild.id)))
                    .setCustomId("ticketid"))
                
                    var msg = cld.first();
                    let role = await  message.guild.channels.cache.get(channel).messages.fetch(msg.content) 
                    if(!role) return message.channel.send(`Aucun message trouve pour \`${msg.content}\` `)
                    
                    db.set("ticketmessage" + message.guild.id,role)
                    if(role.author.id !== client.user.id) return message.channel.send("Ce messsage ne m'appartient pas")
                    role.edit({components : [bt]})



                
                
                    


          })
          })
          
}
        })
        client.on("interactionCreate", async (i) => {
          if (!i.isSelectMenu()) return;
           const filter = m => message.author.id === m.author.id;
           if (i.user.id !== message.author.id) return i.reply({content : "Vous n'êtes pas autorisé à utilisé cette interaction",ephemeral : true})
          
          switch (i.values[0]) {
            case message.id + "Style Embed":
              i.deferUpdate()
              db.delete(`ticketstyle_${message.guild.id}`)
              db.set(`ticketstyle_${message.guild.id}`, "message")

              updateembed(m)
              break
            case message.id + "Style Modals":
              i.deferUpdate()
              db.delete(`ticketstyle_${message.guild.id}`)
              db.set(`ticketstyle_${message.guild.id}`, "modals")
              updateembed(m)
              break
            case message.id + "Modifier l'embed de ticket":
              i.deferUpdate()
              db.set(`ticketembed_${message.guild.id}`, null)
              embedmsg(m)
              break

            case message.id + "Supprimer l'embed de ticket":
              i.deferUpdate()
              db.set(`ticketembed_${message.guild.id}`, null)
              updateembed(m)
              break
            case  message.id + "Modifier le rôle s'occupant du ticket":
              i.deferUpdate()
              message.channel.send(`Quel est **le rôle qui va s'occuper du ticket** ?`).then(mp => {
                mp.channel.awaitMessages(
                   { 
                    filter : filter,
                    max: 1, 
                    time: 60000, 
                    errors: ['time'] })
                  .then(cld => {

                    var msg = cld.first();
                    let role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                    if(!role) return message.channel.send(`Aucun rôle trouve pour \`${msg.content}\` `)


                    db.set(`ticketrole_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case  message.id + "Supprimer le rôle s'occupant du ticket":
              i.deferUpdate()
              db.set(`ticketrole_${message.guild.id}`, null)
              updateembed(m)
              break
            case message.id + "Modifier le salon de ticket":
              i.deferUpdate()
              message.channel.send(`Quel est **le nouveau salon de ticket** ?`).then(mp => {
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

                    db.set(`ticketchannel_${message.guild.id}`, role.id)
                    mp.delete()
                    cld.first().delete()
                    updateembed(m)

                  });
              })
              break
            case  message.id + "Supprimer le salon de ticket":
              i.deferUpdate()
              db.delete(`ticketchannel_${message.guild.id}`)
              updateembed(m)
              break
         
            case  message.id + "Modifier les questions":
              i.deferUpdate()
              let quest = []
              try {
                  let toreply = message;
                  let nb = await askForNumber("Combien de **questions dans les modals** (max 5)?");
                  if(nb > 5  ) return message.channel.send("Maximum 5 questions ")
                  for (let is = 0; is < nb;  is++) {
                      let role = await ask(`Donnez la question n°${is + 1}`);
                      if (quest.map(r => r.question).includes(role)) {
                          await toreply.reply(':x: Question déja utilisé. Choissisez une autre.');
                          --is;
                          continue;
                      }
                      quest.push({ question : role })
                    }
                    db.set("ticketquest" + message.guild.id,quest)

                   
                     console.log(quest)
                 
                  async function askForNumber(txt) {
                    let msg = await ask(txt);
                    msg = parseInt(msg);
                    if (msg) return msg;
                    message.channel.send("Vous n'avez pas donné une nombre valide.");
                }
                async function ask(txt) {
                    await message.reply(txt)
                    let msgs = await message.channel.awaitMessages({
                        filter: m => m.author.id === message.author.id,
                        max: 1,
                        time: 60000
                    })
                    let msg = msgs.first()
                    if (!msg) throw new Error("Aucune reponse donnée.")
                    toreply = msg;
                    return msg.content;
                }
                updateembed(m)
                  }catch (e) {
                    console.log(e)
                  }
            
              break
              case  message.id + "Supprimer les questions":
                i.deferUpdate()
                db.delete("ticketquest" + message.guild.id)
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
            value: message.id + option.value,
            description: option.description,
            emoji: option.emoji,


          })
          ))
        const bt = new MessageButton()
          .setStyle("PRIMARY")
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
        .setFooter(`Prefix actuel : ${prefix}  • Owls Bots`)
        .addField(`Informations sur l'utilisateur : `,`Mention de l'user : {user}
        Id de l'user : {user:id}
        Tag de l'user : {user:tag}
        Nom de l'user : {user:name}`)
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
            if (i.user.id  !==  message.author.id) return i.reply({content : "Tu n'as le droit d'utiliser cette interaction",ephemeral : true})
            if (i.customId === "embedmsg1" + message.id) {
              i.deferUpdate()
              db.set(`ticketembed_${message.guild.id}`, msgg.embeds[0])
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
            if (i.user.id  !==  message.author.id) return i.reply({content : "Tu n'as le droit d'utiliser cette interaction",ephemeral : true})
            switch (i.values[0]) {
              case message.id +"Modifier le titre":
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

              case  message.id + "Supprimer l'auteur":
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
              case  message.id + "Modifier le thumbnail":
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

              case  message.id + "Supprimer le thumbnail":
                embedbase.setThumbnail("htps://slm.com")
                msgg.edit(embedbase)
                break
              case  message.id + "Modifier l'image":
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

              case  message.id + "Supprimer l'image":
                i.deferUpdate()
                embedbase.setImage("htps://slm.com")
                msgg.edit({ embeds: [embedbase] })
                break

              case  message.id + "Modifier l'url du titre":
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

              case  message.id + "Supprimer l'url du titre":
                i.deferUpdate()
                embedbase.setURL("htps://")
                msgg.edit(embedbase)
                break
              case "Supprimer l'image":
                i.deferUpdate()
                embedbase.setImage("** **")
                msgg.edit(embedbase)
                break

              case  message.id + "Modifier la couleur":
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



              case  message.id + "Copier un embed":
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