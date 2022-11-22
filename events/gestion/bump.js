const client = require("../../index")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

client.on("messageCreate", async message => {
    if(db.get("bump" + message.guild.id) == true ) { 
    if(message.embeds && message.author.id == "302050872383242240" && message.embeds[0].description.includes("Bump effectué !"))
        {
          
            message.channel.send(`<@${message.interaction.user.id}>,* je vais vous rappeler de bump dans 2 heures.**`).then(()=>{
              setTimeout(()=> {
                  message.channel.send(`<@${message.interaction.user.id}>,**il est temps de bump.**`)
              },7200000)  
            })
            
            
                
        }
    }
       
  
})