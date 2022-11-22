const { Message, Client, MessageEmbed } = require("discord.js");
const { token } = require("../../config.json")

module.exports = {
    name: "restart",
    helpname : "restart",
    description : "Permet de redémarrer le bot",
    aliases: ['reboot'],
    emoji : "🔁",
    ownerOnly: true,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

    message.channel.send("🕙 Reboot en cours ...").then(async msg => {
        msg.edit("🕙 Reboot en cours ...")
        client.destroy();
        await client.login(token);
        await msg.edit("🕙 Reboot en cours ...")
        msg.edit("Reboot bien effectué")
    })
 }
    }