const client = require("../../index");
const { MessageEmbed,MessageButton,MessageActionRow } = require('discord.js');
const color = 'BLUE'

client.on("interactionCreate", async (interaction) => {
   
  


    //Reacion Role Handler
    if (interaction.isSelectMenu()) {
    if (interaction.customId == "rolesupr")  { 
    let id = interaction.values[0]
    await interaction.deferReply({ ephemeral: true })
   // await message.reset()
    if (interaction.member.roles.cache.has(id)) {
        return await interaction.member.roles.remove(id)
            .then(() => interaction.editReply(`Le rôle <@&${id}> vien de vous être retiré.`))
            .catch(() => interaction.editReply(`Je n'ai pu vous retirer le rôle <@&${id}>.`))
    } else {
        return await interaction.member.roles.add(id)
            .then(() => interaction.editReply(`Le rôle <@&${id}> vien de vous être ajouté.`))
            .catch(() => interaction.editReply(`Je n'ai pu vous ajouter le rôle <@&${id}>.`))
    }
}
    }
    if(interaction.isSelectMenu()) {
        if(interaction.customId == "tickets") {
            let op = interaction.values[0]
        
            let modal = interaction

            modal.reply({content: `Création de votre ticket en cours`,ephemeral : true}).then((m)=>{
                modal.guild.channels.create("ticket-" + modal.user.username,{ 
                    permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                     {
                        id: interaction.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                type: 'text',
                topic: `📨 Ticket pour : ${interaction.user.tag} (${interaction.user.id})`
            }).then((e)=> {
                const butt = new MessageButton().setCustomId("ticket_button").setLabel("Claim").setEmoji("🙋").setStyle("PRIMARY")
                const butt2 = new MessageButton().setCustomId("ticket_close").setLabel("Fermer").setStyle("DANGER").setEmoji("🎟️")
                let row = new MessageActionRow().addComponents([butt,butt2])
                
                modal.editReply({content : `Ticket crée ${e}`,ephemeral : true})
                let embed = new MessageEmbed().setTitle(`Ticket pour ${interaction.user}`).setDescription(`Raison : ${op} `).setColor('BLUE')
                e.send({embeds : [embed],components : [row]})

        })
    })
    }
}

client.on("interactionCreate", async (i)=> {
    if(!i.isButton())return;
    if(i.customId == "ticket_button") {
        if(!i.member.permissions.has("ADMINISTRATOR")) return i.reply({content : "Seulement un administrateur peut me claim",ephemeral : true})
        i.reply({embeds : [ new MessageEmbed().setDescription(`${i.user} a claim le ticket`)]})
    
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
        i.reply({content : "Suppression du ticket..",ephemeral : false})
        setTimeout(()=> {
                i.channel.delete()
        },ms("5s")) 



    }
   
})
})


