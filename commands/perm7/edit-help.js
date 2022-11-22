const { Client, Message, MessageEmbed,MessageActionRow,MessageButton,MessageSelectMenu } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'edit-help',
    aliases :"edit_help",
    helpname : "edit-help",
    description : "Permet de personnalisé le help",
    ownerOnly : true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        function updateem(message) { 
        let button = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
            .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
            .setCustomId("help-butt"),
            new MessageButton()
            .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
            .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
            .setCustomId("help-butt_left"),
            
        )

        let menuoptions = [

            { value: "Modifier le style", description: "", emoji: "✍" },
            { value: "Modifier l'emoji", description: "", emoji: "⭐" },


        ]

        let menustyle = [

            { value: "Rouge", description: "", emoji: "🔴" },
            { value: "Bleu ", description: "", emoji: "🔵" },
            {value : "Vert", description : "", emoji : "🟢"},
            {value : "Gris", description : "", emoji : "⚫"}


        ]

        let interactiveButtons = new MessageSelectMenu()
        .setCustomId(message.id + 'MenuSelection')
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder('Fais un choix')
        .setOptions(menuoptions.map(option => ({
            label: option.value,
            value:  option.value,
            description: option.description,
            emoji: option.emoji

        })))
        let newStyle = new MessageSelectMenu()
        .setCustomId(message.id + "StyleSelection")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Fais un choix")
        .setOptions(menustyle.map(option => ({
            label: option.value,
            value: option.value,
            description: option.description,
            emoji: option.emoji

        })))
        let style = new MessageActionRow().addComponents(newStyle)
        let ez = new MessageActionRow().addComponents(interactiveButtons)

        message.edit({components: [ez,button]})
    }


    let button = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
        .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setCustomId("help-butt"),
        new MessageButton()
        .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
        .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
        .setCustomId("help-butt_left"),
        
    )

    let menuoptions = [

        { value: "Modifier le style", description: "", emoji: "✍" },
        { value: "Modifier l'emoji", description: "", emoji: "⭐" },


    ]

    let menustyle = [

        { value: "Rouge", description: "", emoji: "🔴" },
        { value: "Bleu", description: "", emoji: "🔵" },
        {value : "Vert", description : "", emoji : "🟢"},
        {value : "Gris", description : "", emoji : "⚫"}


    ]

    let interactiveButtons = new MessageSelectMenu()
    .setCustomId(message.id + 'MenuSelection')
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder('Fais un choix')
    .setOptions(menuoptions.map(option => ({
        label: option.value,
        value:  option.value,
        description: option.description,
        emoji: option.emoji

    })))
    let newStyle = new MessageSelectMenu()
    .setCustomId(message.id + "StyleSelection")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("Fais un choix")
    .setOptions(menustyle.map(option => ({
        label: option.value,
        value: option.value,
        description: option.description,
        emoji: option.emoji

    })))
    let style = new MessageActionRow().addComponents(newStyle)
    let ez = new MessageActionRow().addComponents(interactiveButtons)

    message.channel.send({components: [ez,button]}).then(async m => {
         setTimeout(()=> {
            let button = new MessageActionRow().addComponents(
                new MessageButton()
                .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
                .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                .setCustomId("help-butt"),
                new MessageButton()
                .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
                .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                .setCustomId("help-butt_left"),
                
            )
        
            let menuoptions = [
        
                { value: "Modifier le style", description: "", emoji: "✍" },
                { value: "Modifier l'emoji", description: "", emoji: "⭐" },
        
        
            ]
        
            let menustyle = [
        
                { value: "Rouge", description: "", emoji: "🔴" },
                { value: "Bleu", description: "", emoji: "🔵" },
                {value : "Vert", description : "", emoji : "🟢"},
                {value : "Gris", description : "", emoji : "⚫"}
        
        
            ]
        
            let interactiveButtons = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Fais un choix')
            .setOptions(menuoptions.map(option => ({
                label: option.value,
                value:   option.value,
                description: option.description,
                emoji: option.emoji
        
            })))
            let newStyle = new MessageSelectMenu()
            .setCustomId(message.id + "StyleSelection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Fais un choix")
            .setOptions(menustyle.map(option => ({
                label: option.value,
                value:  message.id + option.value,
                description: option.description,
                emoji: option.emoji
        
            })))
            let style = new MessageActionRow().addComponents(newStyle)
            let ez = new MessageActionRow().addComponents(interactiveButtons)
            m.edit({components : [ez,style]})
         }, 60000 * 5)
    

        client.on('interactionCreate', async (i) => {
            if(!i.isSelectMenu()) return;
            if (i.user.id  !==  message.author.id) return i.reply({content : "Tu n'as pas  le droit d'utiliser cette interaction",ephemeral : true})
            if(i.values[0] == "Modifier le style") {
            i.deferUpdate()
                i.message.edit({components : [style,button]})
            }else if (i.values[0] == "Modifier l'emoji") {
                i.deferUpdate()
                let filter2 = (m) => m.author.id === message.author.id;
                let question5 = await message.channel.send(`Quel **doit être le nouveau émoji pour la droite** ?`)
                let durerecup = await message.channel.awaitMessages({
                  filter: filter2,
                  max: 1,
                  time: 60000
                })
                var msg = durerecup.first().toString()
                db.set("helpedit_right",msg)
            
                question5.delete()
                let question6 = await message.channel.send(`Quel **doit être le nouveau émoji pour la gauche** ?`)
                let durerecup_left = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000
                  })
                  var msg = durerecup_left.first().toString()
                  db.set("helpedit_left",msg)
                
                  question6.delete()
                  updateem(m)

            } 
            else if (i.values[0] =="Rouge") {
                i.deferUpdate()
                db.set("helpstyle", "DANGER")
                updateem(m)
            } else if (i.values[0] == "Vert") {
                i.deferUpdate()
                db.set("helpstyle", "SUCCESS")
                updateem(m)
            } else if (i.values[0] =="Gris") {
                i.deferUpdate()
                db.set("helpstyle", "SECONDARY")
                updateem(m)
            } else if(i.values[0] == "Bleu") {
                i.deferUpdate()
                db.set("helpstyle","PRIMARY")
                updateem(m)

            }
        })
    })
}
}
