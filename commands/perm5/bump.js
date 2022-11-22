const { Client, Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db")
module.exports = { 
    name : "bump",
    helpname : "bump <on/off>",
    description : "Permet d'activer ou désactvé le reminder de bump",
    
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
  
     run : async(client, message, args) => { 
        if(args[0] == "on") {
            db.set("bump" + message.guild.id,true)
            message.channel.send("Je viens **d'activer le reminder bump**")
        } else if (args[0] == "off") { 
        db.delete("bump" + message.guild.id)
        message.channel.send("Je viens **de désactiver le reminder bump**")
    } else {
        return message.channel.send("C'est sois `on` ou `off`")
    }
}
}