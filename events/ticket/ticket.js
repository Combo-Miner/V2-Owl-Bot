const client = require("../../index")
const db = require("quick.db");
const { MessageActionRow,MessageButton, MessageEmbed} = require("discord.js");
const ms = require("ms");

client.on("interactionCreate", async (i) => {
    let message = i
    let bt = new MessageActionRow().setComponents(
        new MessageButton()
    .setLabel((db.get("ticket" + message.guild.id))  === null ? "✅" : db.get("ticket" + message.guild.id))
    .setStyle((db.get("ticket_style" + message.guild.id) == null ? "PRIMARY" : db.get("ticket_style" + message.guild.id)))
    .setCustomId("ticketid"))

    if(i.customId == "ticketid") {
        let verify =    db.get(`ticketno_${message.guild.id}_${message.user.id}`,true)


        if(verify == true) return i.reply({content : "Vous avez déjà un ticket de ouvert",ephemeral : true})
  
      
      


        let style = db.get(`ticketstyle_${message.guild.id}`) 

       if(style  == "modals") {
            
       
              const questw = db.get("ticketquest" + message.guild.id)
                if(!questw) {i.deferUpdate() 
                  return }
                 const { Modal,TextInputComponent,showModal } = require('discord-modals'); 
  
  const modal = new Modal() 
      .setCustomId('modal-customid')
      .setTitle('Modal')
      questw.map(r=> r.question).forEach(q=> modal.addComponents(new TextInputComponent()
      .setCustomId(q)
      .setLabel(q)
      .setStyle('LONG') 
      .setPlaceholder("Merci de répondre")
      .setRequired(true)))
      showModal(modal, {
          client: client, 
          interaction: i, 
      });
    
      

       } else if (style == "message") {
let modal = i
let interaction = modal
           modal.reply({content: `Création de votre ticket en cours`,ephemeral : true}).then((m)=>{
            modal.guild.channels.create("ticket-" + modal.user.username,{ 
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: db.get("ticketrole_" + interaction.guild.id),
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text',
            topic: `📨 Ticket pour : ${interaction.user.tag} (${interaction.user.id})`
        }).then((e)=> {
           
            
            modal.editReply({content : `Ticket crée ${e}`,ephemeral : true})
            db.set(`ticketno_${modal.guild.id}_${modal.user.id}`,true)
            let embedj =  db.get(`ticketembed_${message.guild.id}`)
            let member = i
            if(!embedj) return i.reply({content : "Il n'y a aucun embed de configuré",ephemeral : true})
            if(!embedj.description) {} else {embedj.description = embedj.description.replace("{user}", member.user).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name)}
            if(!embedj.title) { } else {embedj.title = embedj.title.replace("{user}", `<${member.user.id}>`).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name)}
            if(!embedj.footer) {} else {embedj.footer.text = embedj.footer.text.replace("{user}", `<${member.user.id}>`).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:name}", member.user.username).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:tag}", member.user.tag).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user:id}", member.user.id).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{user}", member.user).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name).replace("{guild:name}", member.guild.name)}
const butt = new MessageButton().setCustomId("ticket_button").setLabel("Claim").setEmoji("🙋").setStyle("PRIMARY")
const butt2 = new MessageButton().setCustomId("ticket_close").setLabel("Fermer").setStyle("DANGER").setEmoji("🎟️")
let row = new MessageActionRow().addComponents([butt,butt2])
 e.send({embeds : [embedj],components : [row]})
    })
    
    
})
}
}

client.on('modalSubmit', async (modal) => {
    if (modal.customId === 'modal-customid') {
        let interaction = modal
       
      
      let questionj =   modal.fields
      if(questionj == 0) return;

        modal.reply({content: `Création de votre ticket en cours`,ephemeral : true}).then((m)=>{
            modal.guild.channels.create("ticket-" + modal.user.username,{ 
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: db.get("ticketrole_" + interaction.guild.id),
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text',
            topic: `📨 Ticket pour : ${interaction.user.tag} (${interaction.user.id})`
        }).then((e)=> {
            db.set("isticket"  + modal.guild.id,e.id)
            db.set(`ticketno_${modal.guild.id}_${modal.user.id}`,true)
            modal.editReply({content : `Ticket crée ${e}`,ephemeral : true})
            
            let embed = new MessageEmbed().setTitle("Réponses");
            let questionj =   modal.fields
          if(questionj == 0) return;
          const butt = new MessageButton().setCustomId("ticket_button").setLabel("Claim").setEmoji("🙋").setStyle("PRIMARY")
          const butt2 = new MessageButton().setCustomId("ticket_close").setLabel("Fermer").setStyle("DANGER").setEmoji("🎟️")
          let row = new MessageActionRow().addComponents([butt,butt2])

          questionj.forEach(f=> embed.addFields({name : f.customId,value : f.value}))
        if(db.get("ticketrole_" + interaction.guild.id)) {
            e.send({content: `${interaction.user} <@&${db.get("ticketrole_" + interaction.guild.id)}> `,embeds : [embed],components : [row]})
        } else {
            e.send({content: `${interaction.user} <@${interaction.guild.id}> `,embeds : [embed],components : [row]})
        }
        })
        })
   
   
        
        
       
    }
});

client.on("interactionCreate", async (i)=> {
    if(!i.isButton())return;
    if(i.customId == "ticket_button") {
        let role = db.get("ticketrole_" + i.guild.id)
        if(role) { 
        if(!i.member.roles.cache.has(role)) return i.reply({content : `Vous ne pouvez pas claim ce ticket,seulement ${i.guild.roles.cache.get(role)} peut le faire `,ephemeral : true})
        i.reply({embeds : [ new MessageEmbed().setDescription(`${i.user} a claim le ticket`)]})
    }
    i.reply({embeds : [ new MessageEmbed().setDescription(`${i.user} a claim le ticket`)]})
    }
    if(i.customId == "ticket_close") {
        let row = new MessageActionRow().addComponents([  new MessageButton().setCustomId("Oui").setStyle("SUCCESS").setLabel("Oui").setEmoji("✅"),new MessageButton().setStyle("DANGER").setLabel("Non").setEmoji("🎟️").setCustomId("Non"),
      ])
       let e =  i.reply({components : [row]})
    }

    if(i.customId == 'Non') {
        i.deferUpdate()
        i.message.delete()
    }
    if(i.customId == 'Oui') {
        let row = new MessageButton().setCustomId("Garder").setEmoji("🟢").setLabel("Garder").setStyle("SECONDARY")
        let row2 = new MessageButton().setCustomId("Supprimer").setEmoji("🔴").setLabel("Supprimer").setStyle("SECONDARY")
        let role = db.get("ticketrole_" + i.guild.id)
       db.delete(`ticketno_${i.guild.id}_${i.user.id}`)
       i.channel.permissionOverwrites.edit(i.user.id, {
         VIEW_CHANNEL: false 
        
       })
       i.reply({content : `${i.guild.roles.cache.get(role)},vous voulez **supprimer le ticket ou le garder** ?`,components : [new MessageActionRow().addComponents([row,row2])], ephemeral : false})



    }
    if(i.customId == "Garder") {
        i.reply("Je garde le ticket")
    } 
    if(i.customId == "Supprimer") {
        db.delete(`ticketno_${i.guild.id}_${i.user.id}`)
        i.reply({content : "Suppression du ticket..",ephemeral : false})
        setTimeout(()=> {
                i.channel.delete()
        },ms("5s")) 
    }
})
})
