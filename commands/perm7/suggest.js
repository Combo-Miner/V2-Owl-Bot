const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name : "suggest",
  emoji: "🎭",
  description: "Permet de faire une suggestion",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(args[0] == "setup") {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        if(!channel) return message.channel.send(`Aucun salon trouvé pour ${args[1] == null ? "rien" : args[1]} `)
        db.set("suggestchannel" + message.guild.id,channel.id)
        message.channel.send(`${channel} est mainteanant **le salon de suggestion**`)
    } else {
        if(db.get("suggestchannel" + message.guild.id)) {
            let suggestion = args.slice(0).join(" ")
            if(!suggestion) return;
            let butt = new MessageActionRow().addComponents([
                new MessageButton().setCustomId('valider').setLabel("Valider").setStyle("SUCCESS"),
                new MessageButton().setCustomId('rejeté').setLabel("Rejeter").setStyle("DANGER"),
                new MessageButton().setCustomId('supprimer').setLabel("Supprimer").setEmoji("🚫").setStyle("PRIMARY")
            ])
            message.guild.channels.cache.get(db.get("suggestchannel" + message.guild.id)).send({embeds : [new MessageEmbed()
                .setAuthor({iconURL : message.member.displayAvatarURL(), name : message.member.user.username})
                .addFields({name :"Suggestion en attente de validation",value : suggestion })
            ], components : [butt]})
            
        }
    }   

  }
}

const client = require("../../index")
client.on("interactionCreate", async (i) => {
    if(!i.isButton()) return;
    
    if(i.customId == "rejeté") {
        if(!i.member.permissions.has("ADMINISTRATOR")) return;
        const { Modal,TextInputComponent,showModal } = require('discord-modals'); 

        const modal = new Modal() 
            .setCustomId('modal-off')
            .setTitle('Modal');
            modal.addComponents(new TextInputComponent()
            .setCustomId("rejeté")
            .setLabel("Raison : ")
            .setStyle('LONG') 
            .setPlaceholder("La raison de pk vous rejeté cette propostion")
            .setRequired(true))
            showModal(modal, {
                client: client, 
                interaction: i, 
            });
        
    } 
    if(i.customId == "valider") {
        i.deferUpdate()
        let msg = i.message.embeds[0].fields[0].value
       let md = i.message.embeds[0].setFields({name : "Suggestion validée", value : msg.toString()}).setColor("GREEN")
        i.message.edit({embeds : [md],components : []})
    }
    if(i.customId == "supprimer") {
        let name = i.message.embeds[0].author.name
        let find = i.guild.members.cache.find(u=> u.user.username.toLowerCase() == name.toLowerCase())
        console.log(find)
        if(find) { 
        if(i.member.id !== find.user.id) return i.reply({content : "Seulement la personne qui a posté peut supprimé sa suggestion",ephemeral: true})
        i.message.delete()
    } 
}
})

client.on('modalSubmit', async (modal) => {
    if (modal.customId ==  'modal-off') {
      let questionj =   modal.fields
      if(questionj == 0) return;
      let embed = new MessageEmbed();
    
      let message = modal.message.embeds[0].fields[0].value.toString()
      console.log(message)
      let e =  modal.message.embeds[0].setColor("RED").setFields({name : "Suggestion rejetée",value : message},{name : "Raison du rejet", value : questionj.map(e=> e.value).toString()})
      console.log(e)
      modal.message.edit({embeds : [e],components : []})
        modal.reply({content : "Merci de ta raison",ephemeral : true})

   
   
        
        
       
    }
});