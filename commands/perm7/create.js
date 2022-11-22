const { Message, Client, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");
const fs = require('fs');


module.exports = {
    name: "create",
    helpname : "create <emoji/sticker>",
    description : "Permet d'ajouter un émoji au serveur",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, Discord) => {
        const emoji = args[0];
        if (!emoji) return message.reply(`Donne moi **un émoji  **`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
      customemoji.animated ? "gif" : "png"
    }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis
                .create(`${Link}`, `${name || `${customemoji.name}`}`)
      .catch((error) => {
        console.log(error);
      });

     

    const Added = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        `L'emoji a été ajouté!・ Nom : \`${name || `${customemoji.name}`}\`・ Image : [Click ici](${Link})`);
    return message.channel.send({embeds: [Added]}).catch((e) => {
      console.log(e);
    });
  } else {
    let CheckEmoji = parse(emoji, {
      assetType: "png",
    });
    if (!CheckEmoji[0])
      return message.channel.send(` Veuillez me donner **un emoji valide**`);
    message.reply(
      `Donne moi un emoji **qui vient pas de discord **`
    );
  }
}
        }
    