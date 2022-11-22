const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "rolemenu",
  helpname : "rolemenu",
  emoji: "🎭",
  description: "Permet de configurer le rôle menu",

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
        let menuoptions = [
          { value: "Style Menu", description: "", emoji: "🏷️" },
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
            value: message.id + option.value,
            description: option.description,
            emoji: option.emoji

          })))
        let butt = new MessageActionRow().addComponents([ bt2])
        let select = new MessageActionRow().addComponents(interactiveButtons)

    
       message.channel.send({components : [select,butt]})
 
     
        
    
        client.on('interactionCreate', async (i) => {
          if (!i.isButton()) return;
          if (i.user.id  !==  message.author.id) return i.reply({content : "Vous n'êtes pas autorisé à utilisé cette interaction",ephemeral : true})
          if (i.customId == message.id + "welcomemsg") {
            i.deferUpdate()
            if (db.get(`leavemessageembed_${message.guild.id}`) !== null) {
              message.channel.send({ embeds: [db.get(`leavemessageembed_${message.guild.id}`)] })
            }
          }
          if (i.customId === message.id + "welcome") {
            i.deferUpdate()

          
          }

        })
        client.on('interactionCreate', async (i) => {
          if (!i.isSelectMenu()) return;
           const filter = m => message.author.id === m.author.id;
           if (i.user.id  !==  message.author.id) return i.reply({content : "Tu n'as pas le droit d'utiliser cette interaction",ephemeral : true})
          switch (i.values[0]) {
            case message.id + "Style Menu":
              i.deferUpdate()
              let roles = []
    try {
        let toreply = message;
        let nb = await askForNumber("Combien de rôles dans le select menu");
        for (let i = 0; i < nb; i++) {
            let role = await askForRole(`Donnez le rôle n°${i + 1}`);
            if (roles.map(r => r.role.id).includes(role.id)) {
                await toreply.reply(':x: Role déja utilisé. Choissisez un autre.');
                --i;
                continue;
            }
            let desc = await ask('Donnez une description \`aucune\` -> aucune emoji')
            if (desc === "aucune") desc = ""
            let emoji = await askForEmoji('Donnez un emoji')
            roles.push({ emoji, desc, role })
        }
        let channel = await askForChannel('Donnez le channel ou les rôles seras affiché le select menu.');
        if (!channel) channel = message.channel;
        let inMessage = await askForBoolean('Voulez vous coller ce select menu dans un message?');

        const selectmenu = new MessageSelectMenu()
            .setCustomId("rolesupr")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Selectionnez un rôle a ajouter/supprimer')
            .setOptions(roles.map(r => ({
                label: r.role.name,
                value: r.role.id,
                description: r.desc,
                emoji: r.emoji
            })))

        if (inMessage) {
            let id = await askForMessageId("Donnez l'id du message où attacher le select menu.");
            let msg = await getMessageWithId(channel, id);
            if (msg.author.id !== client.user.id)
                return await toreply.reply('Ce message n\'as pas été envoyé par moi. Et donc je ne peux pas le modifier')
            try {
                await msg.edit({
                    components: [
                        ...msg.components.map(e => e),
                        new MessageActionRow().setComponents(selectmenu)
                    ]
                })
                toreply.reply('Le message a bien étè édité.')
            } catch (err) {
                console.log(err);
                toreply.reply('Le message n\'a pas pu être modifié malheureusement.')
            }
        } else return await channel.send({components : [new MessageActionRow().addComponents(selectmenu)] });


        async function askForMessageId(txt) {
            let res = await ask(txt);
            return res.split("/").pop();
        }
        async function getMessageWithId(channel, id) {
            let msg = channel.messages.cache.get(id) || await channel.messages.fetch(id);
            if(msg) return msg;
          message.channel.send(`Aucun message avec l'id \`${id}\` trouvé.`);
        }
        async function askForBoolean(txt) {
            let res = await ask(`${txt}\n(oui/non)`)
            res = res.toLowerCase()
            if (["oui", "oe", "y", "yes"].includes(res)) return true;
            if (["non", "no", "nn","nope"].includes(res)) return false;
            message.channel.send("Vous n'avez pas donné une valeur valide (oui/non).")
        }
        async function askForChannel(txt) {
            let res = await ask(`${txt}\n (<#mention> / id)`)
            let channel = message.guild.channels.cache.get(res) || message.guild.channels.cache.find(c => c.toString() === res);
            if (!channel) message.channel.send("Salon valide.")
            if (!channel.isText()) message.channel.send('Salon non-textuel')
            return channel;
        }
        async function askForEmoji(txt) {
            let emoji = await ask(`${txt}\n\`aucun\` -> Aucun emoji`)
            if (emoji === "aucun") return null;
            emoji = message.guild.emojis.cache.find(e => [e.name, e.toString(), e.id].includes(emoji)) || emoji;
            if (!emoji) message.channel.send('Aucun emoji trouvé.');
            return emoji
        }
        async function askForRole(txt) {
            let role = await ask(txt);
            role = message.guild.roles.cache.find(r => [r.name, `${r}`, r.id].some(smt => smt === role))
            if (!role) message.channel.send('Aucun rôlé trouvé.');
            return role;
        }
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

    } catch (err) {
        console.error(err);
    }
    break 
    case "Style Buttons":
      i.deferUpdate()
                } 

                })
            }
    }
      



        


        
      
    
  