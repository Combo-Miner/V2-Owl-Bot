const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    helpname :  "say <phrase>",
    emoji: "🎅",
    description : "Permet de faire dire quelque chose au bot",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let mots = args.slice(" ").join(" ")
        if(!mots) return;

        message.channel.send(mots)



        

    } 
}
    