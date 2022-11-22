const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setname",
    helpname : "setname <nom>",
    ownerOnly: true,
    description: 'Permet de changer le nom du bot',
    emoji: '📚',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (args.length) {
            let str_content = args.join(" ")
            client.user.setUsername(str_content)
            .then(u => message.channel.send(` ${message.author}, Vous avez changé le pseudonyme de votre bot.`))
            .catch(e => { message.channel.send(`${message.author}, Une erreur est survenue. \n \`Plus d'informations:\` \`🔻\` \`\`\`${e}\`\`\``); });
        } else {
            message.channel.send(`${message.author}, Vous avez fournie aucune valeur.`);
        }
    }
    }
