const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "pic",
    helpname : "pic <membre>",
    description: "*Permet de voir ton avatar ou  d'une personne*",
    aliases: ["pic"],
    cooldown: 10,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
 const member = message.mentions.users.first() || await client.users.fetch(args[0]|| message.member.id) 
        
        
        

        const png = member.displayAvatarURL({ dynamic: false, format: 'png' });
        const jpg = member.displayAvatarURL({ dynamic: false, format: 'jpg' });
        const webp = member.displayAvatarURL({ dynamic: false, format: 'webp' });
        const gif = member.displayAvatarURL({ dynamic: true });
        // const bmp = member.user.displayAvatarURL({ dynamic: false, format: 'bitmap' });

        const avatarMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu({
                placeholder: "Choisi la taille de l'avatar",
                customId: 'main',
                options: [
                    {
                        label: '128 pixels',
                        value: "Option 1",
                        emoji: '🖼️',
                    },
                    {
                        label: '256 pixels',
                        value: "Option 2",
                        emoji: '🖼️',
                    },
                    {
                        label: '[Original] 1024 pixels',
                        value: "Option 0",
                        emoji: '🖼️',
                    },
                ]
            }),
        );

        const avtEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Size : x1024p')
            .setImage(member.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
            .setDescription(` ${member.username} :\n**[png](${png}) | [jpg](${jpg}) | [gif](${gif}) | [webp](${webp})**` || `**[png](${png}) | [jpg](${jpg})**`)

        let avt = await message.channel.send({ embeds: [avtEmbed], components: [avatarMenu] })

        const filter = async interaction => {

            if (interaction.user.id !== message.author.id) {
                interaction.reply({
                    content: "🚫 N'aide pas les autres à séléctionner le menu.",
                    ephemeral: true
                });
                return false;
            };
            return true;
        }

        const collector = avt.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 50000,
        })

        collector.on('collect', async (menu) => {
            if (menu.values[0] === 'Option 1') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Taille : 128px').setImage(member.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 0') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Taille : 1024px').setImage(member.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 2') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Taille : 256px').setImage(member.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
                    ]
                })
            }
        }) 
    } 
    };