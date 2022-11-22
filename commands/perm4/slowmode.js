const { Message, Client, MessageEmbed } = require("discord.js");
const ms = require('ms');
fs = require('fs');

module.exports = {
    name: "slowmode",
    helpname :"slowmode <temps> <raison>",
    description : 'Permet de configurer un slow mode',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`Vous n\'avez pas spécifié de temps!`)

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'Aucune raison';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.reply('Le Slowmode est déja désactivé')

            embed.setTitle(' Slowmode Désactivé')
                .setColor('RED')
            return message.channel.setRateLimitPerUser(0, reason).then(m => m.send({embeds: [embed]}))

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send(' Pas une heure valide, veuillez réessayer!')

        if (time >= 21600) return message.channel.send(' Ce temps est trop élevée, veuillez saisir une valeur inférieure à 6 heures.')

        if (currentCooldown === time) return message.reply(` Le Slowmode est déja configuré sur ${args[0]}`);

        embed.setTitle('Slowmode Activé')
            .addField('Slowmode: ', args[0])
            .addField('Raison: ', reason)
            .setColor('RANDOM');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send({embeds: [embed]}));

    }
        }
    