
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db");
const warndb = require("../../models/users")
module.exports = {
  name: "prevnames",
  helpname : "emojilist",
  description: 'Permet de voir les anciens pseudo de un utilisateur',
  run: async (client, message, args) => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;
    let user = message.mentions.users.first() || await  client.users.fetch(args[0] || message.member.id)
    if(!user) return;
warndb.findOne({
    User : user.id
}, async (err, data) => {
    if (err) throw err
    if (data) {


        let description;

        description = data.content.map(
            (w, i) => `<t:${w.date}> - ${w.username}`
        )
          .slice(0, 1)
          .join("\n");
          let emb = new MessageEmbed()
          .setColor("BLUE")
          .setAuthor(`Liste des anciens pseudos de ${user.username} `)
          .setFooter(
            `Page ${page}/${Math.ceil(data.content.length / 10)}`
          )
          
          .setDescription(description);
        if(data.content.length > 10){
            let button = new MessageActionRow().addComponents([
                new MessageButton().setCustomId("previous").setLabel("👈").setStyle("PRIMARY"),
                new MessageButton().setCustomId("next").setLabel("👉").setStyle("PRIMARY")
            ])
            let msg = await message.channel.send({
                embeds: [emb],
                components: [button]
              });
              let filter = i => i.user.id === message.author.id;

let collector = msg.createMessageComponentCollector({
  filter
});

collector.on("collect", async i => {
  if (i.customId === "previous") {
    i.deferUpdate()
    i0 = i0 - 10;
    i1 = i1 - 10;
    page = page - 1;

    if (i1 < 9) return msg.delete();

    description = data.content.map(
        (w, i) => `<t:${w.date}> - ${w.username}`
    )
      .slice(i0, i1)
      .join("\n");

    emb
    .setColor("BLUE")
    .setAuthor(`Liste des anciens pseudos de ${user.username} `)
    .setFooter(
        `Page ${page}/${Math.ceil(data.content.length / 10)}`
      )
      .setDescription(description);

    msg.edit({
      embeds: [emb]
    });
  }

  if (i.customId === "next") {
    i.deferUpdate()
    i0 = i0 + 10;
    i1 = i1 + 10;
    page = page + 10;

    if (i1 > data.content.length + 1) return msg.delete();
    if (!i0 || !i1) return msg.delete();

    description = data.content.map(
        (w, i) => `<t:${w.date}> - ${w.username}`
    )
      .slice(i0, i1)
      .join("\n");

    emb
    .setFooter(
        `Page ${page}/${Math.ceil(data.content.length / 10)}`
      )
      .setColor("BLUE")
      .setAuthor(`Liste des anciens pseudos de ${user.username} `)
      .setDescription(description);
    msg.edit({
      embeds: [emb]
    });
  }
});
        } else { 
        const e = data.content.map(
            (w, i) => `\n\ <t:${w.date}> - ${w.username}`
        )
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`Liste des anciens pseudos de ${user.username} `)
            .setDescription(e.join(' '))
        message.channel.send({
            embeds: [embed]
        })
    } 
    } else {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(`Liste des anciens pseudos de ${user.username}`)
                    .setDescription("*Aucune donnée*")]
        })
    
}

})

}}