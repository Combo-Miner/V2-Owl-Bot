const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setavatar",
    helpname : "setavatar <lien>",
    description : "Permtet de changer la pp du bot",
    aliases: ['setpic','set_pic','set_avatar','set-avatar'],
    ownerOnly: true,
    emoji: '🐲',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.attachments.size > 0) { 
            message.attachments.forEach(attachment => {
                client.user.setAvatar(attachment.url)
                .then(u => message.channel.send(`${message.author}, Vous avez changé la photo de profil de votre bot.`))
                .catch(e => { return message.channel.send(` Une erreur est survenue. \n \` Plus d'informations:\`  \`🔻\` \`\`\`${e}\`\`\``); });
            });
            } else if (args.length) {
                let str_content = args.join(" ")
                client.user.setAvatar(str_content)
                .then(u => message.reply(`Vous avez changé la photo de profil de votre bot.`))
                .catch(e => { return message.channel.send(` Une erreur est survenue. \n \`Plus d'informations:\`  \`🔻\` \`\`\`${e}\`\`\``); });
            } else {
                message.channel.send(`Veuillez mettre sois une image sois un lien`);
            }
        }
        };
        
