const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name : "configticket",
  emoji: "🎭",
  description: "Permet de configurer le rôle menu",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {  
    let roles = []
    try {
        let toreply = message;
        let nb = await askForNumber("Combien de options dans le menu");
        for (let i = 0; i < nb; i++) {
            let role = await askForRole(`Donnez le nom de l'option n°${i + 1}`);
            if (roles.map(r => r.role).includes(role)) {
                await toreply.reply(':x: Option déja utilisé. Choissisez une autre.');
                --i;
                continue;
            }
            let desc = await ask('Donnez une description \`aucune\` -> aucune description')
            if (desc === "aucune") desc = ""
            let emoji = await askForEmoji('Donnez un emoji')
            roles.push({ emoji, desc, role })
        }
        let channel = await askForChannel('Donnez le channel menu sera affiché.');
        if (!channel) channel = message.channel;
        let inMessage = await askForBoolean('Voulez vous coller ce select menu dans un message?');

        const selectmenu = new MessageSelectMenu()
            .setCustomId("tickets")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Selectionnez une options')
            .setOptions(roles.map(r => ({
                label: r.role,
                value: r.role,
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
            let emoji = await ask(`${txt}\n\`aucun\` -> Aucune emoji `)
            if (emoji === "aucun") return null;
            emoji = message.guild.emojis.cache.find(e => [e.name, e.toString(), e.id].includes(emoji)) || emoji;
            if (!emoji) message.channel.send('Aucun emoji trouvé.');
            return emoji
        }
        async function askForRole(txt) {
            let role = await ask(txt);
                   
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


  }
}