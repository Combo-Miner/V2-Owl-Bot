const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
    name: "servers",
    helpname : "servers",
    description : "Permet de voir les serveur où le bot se situe",
    aliases: ['servers'],
    ownerOnly: true,
    emoji : "📋",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args,Discord) => {
      let i0 = 0;
      let i1 = 10;
      let page = 1;

      let description;
   
      description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1})** ${r.name}  \`(${r.memberCount} Membres)\``)
          .slice(0, 10)
          .join("\n");

      let emb = new MessageEmbed()
    .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
    .setFooter(`Page ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
    .setDescription(description);

   let pages = new MessageActionRow().addComponents(
   new MessageButton()
   .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
   .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
 .setCustomId("previous"),
   new MessageButton()
   .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
   .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
  .setCustomId("next")
   )
   
   let dis = new MessageActionRow().addComponents(
   new MessageButton()
   .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
  .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
  .setDisabled(true)
 .setCustomId("previous"),
   new MessageButton()
   .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
   .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
  .setDisabled(true)
  .setCustomId("next")
   )

      
  if(client.guilds.cache.size < 10) return message.channel.send({
      embeds: [emb],
      components: [dis]
  }) 
   
      let msg = await message.channel.send({
          embeds: [emb],
          components: [pages]
      });
 
    let filter = (i) => i.user.id === message.author.id;

      let collector = msg.createMessageComponentCollector({
    filter
      });

      collector.on("collect", async (i) => {
        if (i.customId === "previous") {
            i.deferUpdate()
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        
    if (i1 < 9) return msg.delete();

    description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1})** ${r.name} \`(${r.memberCount} Members)\``)
          .slice(i0, i1)
          .join("\n");

    emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 10)}`)
    .setDescription(description);

        msg.edit({
        embeds: [emb]
            
        });
        }

        if (i.customId === "next") {
            i.deferUpdate()

          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          if (i1 > client.guilds.cache.size + 10) return msg.delete();   
      if (!i0 || !i1) return msg.delete();

         description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1})** ${r.name} \`( ${r.memberCount} Members)\``)
          .slice(i0, i1)
          .join("\n");


    emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 10)}`)
    .setDescription(description)      
    msg.edit({
        embeds: [emb]
    })
        }
      })
  }
}