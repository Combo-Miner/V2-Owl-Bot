const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "watch",
   helpname : "watch <contenu>",
    description: 'Permet de changer le statut du bot en watch',
    ownerOnly: true,
    emoji: '⌚',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (args.length) {
            let str_content = args.join(" ")
    client.user.setPresence({ activities: [{ name: str_content, type: "WATCHING"  }], status: 'dnd'})
    return message.channel.send(` ${message.author}, Vous avez définis le statut de votre bot en \`${str_content}\``)
    .catch(e => { message.channel.send(` ${message.author}, Une erreur est survenue. \n \`Plus d'informations:\` \`🔻\` \`\`\`${e}\`\`\``); });
    
    } else {
        message.channel.send(` ${message.author}, Vous avez fournie aucune valeur.`);
        }
    }



    } 
