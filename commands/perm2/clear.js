
const { client, MessageEmbed, Message,Client } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: 'clear',
    helpname : "clear [sanction <membre> /all sanctions] <membre> <nombre> ",
    description : "Permet de supprimer les sanctions ou les message / d'un membre",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[0]} args 
     */
  
    run : async(client, message, args) => {
     
if(args[0] == "sanction") { 
 let user = message.mentions.members.first() 
 user = user.user
 if (!user) return;
 const number = db.fetch(`number.${message.guild.id}.${user.id}`)

 message.channel.send(` ${number == null ? "0" : db.get(`number.${message.guild.id}.${user.id}`)} ${number > 1 ? "sanctions ont été supprimés" : "sanction à été supprimé"}`)
 db.delete(`number.${message.guild.id}.${user.id}`)
 db.delete(`info.${message.guild.id}.${user.id}`)
 let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
 if(logs) {
   logs.send({embeds : [new MessageEmbed()
       .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
       .setDescription(`${message.member.user.username} a **supprimer tous les sanctions de ${user} **`)
       
   
   ]})
   }

   

} else if (args[0] == "all" && args[1] == "sanctions" ){
    let m = message.guild.members.cache.forEach(m=> {db.delete(`info.${message.guild.id}.${m.id}`), db.delete(`number.${message.guild.id}.${m.id}`)})  
     message.channel.send("Tous les sanctions ont été **supprimés**")
     let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
     if(logs) {
       logs.send({embeds : [new MessageEmbed()
           .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
           .setDescription(`${message.member.user.username} a **supprimer tous les sanctions du serveur **`)
           
       
       ]})
       }
    
 } else if(message.mentions.members.first()) {
    let number = parseInt(args[1])
    if(!number) number  = 100
        message.delete()
        message.channel.messages.fetch({ limit: number })
            .then((messages) => {
                var filterUser = message.mentions.members.first().id;
                var filtered = (messages.filter(m => m.author.id === filterUser).map(m=> m.id).slice(0,number))
            
                message.channel.bulkDelete(filtered, true)
                const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
                let prefix = db.get(`prefix_${message.guild.id}`)
                if(!prefix) {
                    prefix = client.config.prefix
                }
               
                let logs = message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`))
                if(logs) {
                  logs.send({embeds : [new MessageEmbed()  .setColor(color)
                    .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
                      .setAuthor({name : message.member.user.username,iconURL : message.member.displayAvatarURL({dynamic : true})})
                      .setDescription(`${message.member.user.username} a **supprimer ${number} message de ${message.mentions.members.first()} ** avec le bot`)
                      
                      
                  
                  ]})
                  }

            }).catch();

}else  {
    let delamount = args[0];
    if (isNaN(delamount) ||  parseInt(delamount <= 0)) return;

    await message.channel.bulkDelete(parseInt(delamount) +1,true);


    await message.channel.send(`J'ai supprimé **${delamount} messages**`).then(m =>{
        setTimeout(() => {
            m.delete()
        }, 3000)
    })
}

} 
}
