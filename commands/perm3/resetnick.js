const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "resetnick",
    helpname :  "resetnick <membre>",
    emoji: "🎅",
    description : "Permet de reset le nom d'un utilisateur",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user = message.mentions.users.first()   || message.author
        
        if (!user) return message.reply(` Merci de mentionner un utilisateur`)

        let nick = args.slice(1).join(" ");
 

        let member = message.guild.members.cache.get(user.id);
        
        await member.setNickname(user.username, []);
        return message.channel.send(` Le pseudo de **${user.username}** a été reset`)



        

    } 
}
    