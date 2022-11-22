const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js") 
const db = require("quick.db")
module.exports = {
  name: "rolelist",
  helpname : "rolelist",
  description:"Permet de voir la liste des rôles",
  run: async (client, message, args) => {


let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description = message.guild.roles.cache
      .map(r => r)
      .map(
        (r, i) =>
          `**${i + 1})** ${r}  \`(${
            message.guild.members.cache.filter(member =>
              member.roles.cache.some(role => role.id === r.id)
            ).size
          } Members)\``
      )
      .slice(0, 10)
      .join("\n");

    let emb = new MessageEmbed()
      .setColor("GREEN")
      .setFooter(
        `Page ${page}/${Math.ceil(message.guild.roles.cache.size / 10)}`
      )
      .setDescription(description);

    let pages = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
      .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setCustomId("previous_role"),
      new MessageButton()
      .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
      .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setCustomId("next_role")
    );

    let dis = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
      .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setDisabled(true)
        .setCustomId("previous_role"),
      new MessageButton()
      
      .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
      .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setDisabled(true)
        .setCustomId("next_role")
    );

    if (message.guild.roles.cache.size < 10)
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
      if (i.customId === "previous_role") {
        i.deferUpdate()
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        if (i1 < 9) return msg.delete();

        description = message.guild.roles.cache
          .map(r => r)
          .map(
            (r, i) =>
              `**${i + 1})** ${r}  \`(${
                message.guild.members.cache.filter(member =>
                  member.roles.cache.some(role => role.id === r.id)
                ).size
              } Members)\``
          )
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(
            `Page ${page}/${Math.ceil(message.guild.roles.cache.size / 10)}`
          )
          .setDescription(description);

        msg.edit({
          embeds: [emb]
        });
      }

      if (i.customId === "next_role") {
        i.deferUpdate()
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > message.guild.roles.cache.size + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();

        description = message.guild.roles.cache
          .map(r => r)
          .map(
            (r, i) =>
              `**${i + 1})** ${r}  \`(${
                message.guild.members.cache.filter(member =>
                  member.roles.cache.some(role => role.id === r.id)
                ).size
              } Members)\``
          )
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(
            `Page ${page}/${Math.ceil(message.guild.roles.cache.size / 10)}`
          )
          .setDescription(description);
        msg.edit({
          embeds: [emb]
        });
      }
    });
  }
}