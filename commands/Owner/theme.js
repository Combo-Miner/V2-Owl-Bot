const {Client,Message} = require('discord.js')
const db = require('quick.db')


module.exports = {
    name: 'theme',
    helpname : "theme <couleur>",
    description : "Permet de changer la couleur de mes embeds",
    aliases: ["color"],
    ownerOnly : true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
    run: async (client, message, args) => {
            if (!args[0]) return
            if (args[1]) return
      
            let  ez = args[0]
            switch (args[0]) {
                case "blue":
                ez = "BLUE"
                break
                case "rouge" :
                    ez = "RED"
                    break;
                case "vert" : 
                ez = "GREEN"
                break;
                case "jaune":
                ez = "YELLOW"
                break;
                case "orange" :
                    ez = "ORANGE"
                    break;
            }
                db.set(`color_${message.guild.id}`,ez  )
                message.channel.send(`J'ai set : \`${args[0]}\` pour ma couleur d'embed`)
            
        


    }
}