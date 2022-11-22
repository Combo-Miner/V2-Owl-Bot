const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db")
module.exports = {
  name: "emojilist",
  helpname : "emojilist",
  description: 'Permet de voir la list entière de emoji',
  category: "fun",
  run: async (client, message, args) => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description = client.emojis.cache
      .map(r => r)
      .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
      .slice(0, 10)
      .join("\n");

    let emb = new MessageEmbed()
      .setColor('RED')
      .setFooter(`Page ${page}/${Math.ceil(client.emojis.cache.size / 10)}`)
      .setDescription(description);

    let pages = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("⬅️")
        .setCustomId("previous_emoji"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("➡️")
        .setCustomId("next_emoji")
    );

    let dis = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
      .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setDisabled(true)
        .setCustomId("previous_emoji"),
      new MessageButton()
      .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
      .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setDisabled(true)
        .setCustomId("next_emoji")
        
    );

    if (client.emojis.cache.size < 10)
      return message.channel.send({
        embeds: [emb],
        components: [dis]
      });

    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;

    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector.on("collect", async i => {
      if (i.customId === "previous_emoji") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        if (i1 < 9) return msg.delete();

        description = client.emojis.cache
          .map(r => r)
          .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(`Page ${page}/${Math.ceil(client.emojis.cache.size / 10)}`)
          .setDescription(description);

        msg.edit({
          embeds: [emb]
        });
      }

      if (i.customId === "next_emoji") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > client.emojis.cache.size + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();

        description = client.emojis.cache
          .map(r => r)
          .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(`Page ${page}/${Math.ceil(client.emojis.cache.size / 10)}`)
          .setDescription(description);
        msg.edit({
          embeds: [emb]
        });
      }
    });
  }
};