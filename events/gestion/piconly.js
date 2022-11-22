const client = require("../../index");
const ms = require('ms')
const osUtils = require("os-utils");
const { MessageEmbed,MessageActionRow,MessageButton } = require("discord.js")
const db = require("quick.db")



client.on("ready", async() => { 

 client.guilds.cache.forEach(async guild => {
   

    let colorcolor = "RANDOM"
     if(colorcolor === null) colorcolor = "#2f3136"
     let interval = 100
            setInterval(() => { // Random Gifsa
      let link =  db.get("pp" + guild.id)
    let link2 = db.get("piconly" + guild.id)
         if(link == true) { 
             let channel = guild.channels.cache.get(link2)
             if(channel) {  
         let user = client.users.cache.random()
         if(user.bot) return;
         if(user.displayAvatarURL({ dynamic : true, size: 1024 }).includes(".gif")){
             
                     let button = new MessageButton()
                     .setStyle("LINK")
                     .setURL(user.displayAvatarURL({ dynamic : true, size: 1024  })) 
                     .setLabel("Clique moi"); 
         let embed = new MessageEmbed()
         .setImage(user.displayAvatarURL({ dynamic : true, size: 1024 }))
         .setColor(colorcolor)
         .setFooter(`Photo de profil de ${user.tag}`)
         channel.send({embeds : [embed], components : [new MessageActionRow().addComponents([button])]}).then(slm => {console.log(`Gif envoyer dans ${guild.channels.cache.get(db.get("pp" + guild.id)).name}`)}).catch(err => {})
         
         
         }
         let buttons = new MessageButton()
         .setStyle("LINK")
         .setURL(user.displayAvatarURL()) 
         .setLabel("Clique moi"); 
         let embed = new MessageEmbed()
         .setImage(user.displayAvatarURL({ size: 1024  }))
         .setColor(colorcolor)
         .setFooter(`Photo de profil de ${user.tag}`)
         
         channel.send({embeds : [embed], components : [new MessageActionRow().addComponents([buttons])]}).then(slm => {console.log(`Pic envoyer dans ${guild.channels.cache.get(db.get(`randompp_${guild.id}`)).name}`)}).catch(err => {})




        }
    } 
         }, 60000*2)
         
         
         })
        }
 )
