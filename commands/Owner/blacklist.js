const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const db = require('quick.db');
const config = require("../../config.json");

module.exports = {
    name: "blacklist",
    aliases : "bl",
    helpname : 'blacklist [add/remove/list/clear]',
    description: "Permet de configurer la blacklist",
    ownerOnly : true,
    emoji: '🔱',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
            if(args[0] == "add") { 
            const user = message.mentions.users.first() || client.users.cache.get(args[1])
            if (!user) return;
            if(db.get(`owners_${client.user.id}_${user.id}`) == true || client.config.owner.includes(user.id)) return;
            let link  = db.get(`blacklist_${client.user.id}_${user.id}`)
            if(link == true) {
                return message.channel.send(`${user.username} est déjà blacklist`)
            } else { 
            db.set(`blacklist_${client.user.id}_${user.id}`, true)
                

                client.guilds.cache.forEach(g => {
                    if(g.members.cache.get(user.id)) {
                        let nmb = 0
                        let nmbe = 0
                     g.members.cache.get(user.id).ban({reason : "Blacklist"}).catch((e)  =>  nmb =+1)
                       

                     
                    }
                    message.channel.send(`${user.username} est maintenant dans la blacklist`)
                  
                })  

              
                   
          
        }
    } else if(args[0] == "remove")
    {
        let user = message.mentions.users.first() || client.users.cache.get(args[1])
        if(!user) return;
        let link  = db.get(`blacklist_${client.user.id}_${user.id}`)
        if(link == true ) {
            db.delete(`blacklist_${client.user.id}_${user.id}`)
            message.channel.send(`${user.username} n'est plus blacklist `)
        } else {
            message.channel.send(`${user.username} n'était pas blacklist `)
        }
    } else if(args[0] == "list") {
        let money = db.all().filter(data => data.ID.startsWith(`blacklist_${client.user.id}`)).sort((a, b) => b.data - a.data) 
        let p0 = 0;
        let p1 = 10;
        let page = 10;

        let ez = money
        .filter(x => client.users.cache.get(x.ID.split('_')[2]))
        .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}>(${client.users.cache.get(m.ID.split('_')[2]).id})`)
        .slice(0, 10)
       
    
        const embed = new MessageEmbed()
            .setTitle('Blacklist')
            .setDescription(ez.join()
    
            )
            .setFooter(`${page} • ${client.user.username}`)
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
            message.channel.send({embeds : [embed]}).then(async tdata => {
                if (money.length > 10) {
                    const B1 = new MessageButton()
                    .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
                    .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                        .setCustomId('bl1');
        
                    const B2 = new MessageButton()
                    .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
                    .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                        .setCustomId('bl2');
        
                    const bts = new MessageActionRow()
                        .addComponents([B1,B2])
                    tdata.edit({ embeds: [embed], components: [bts] })
                    client.on("interactionCreate", async (i) => {
                        if(i.isButton()) { 
                        if(i.user.id !== message.author.id) return;
                        if(i.customId == "bl1") {
                            i.deferUpdate()
                            p0 = p0 - 10;
                            p1 = p1 - 10;
                            page = page - 1
        
                            if (p0 < 0)  return;
                            
                            if (p0 === undefined || p1 === undefined) return;
                            
                            embed.setDescription(money
                                .filter(x => client.users.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}> (${client.users.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
                                .join()
        
                            )
                                .setFooter(`${page} • ${client.user.username}`)
                            tdata.edit({embeds : [embed]});
        
                        } else if (i.customId == "bl2") {
                            i.deferUpdate()
                            p0 = p0 + 10;
                            p1 = p1 + 10;
                            page++;
                            if (p1 > money.length + 10) {
                                return
                            }
                            if (p1 >   money.length) {
                       
                                return
                               
                           }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
        
        
                            embed.setDescription(money
                                .filter(x => client.users.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}> (${client.users.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
                                .join()
        
                            )
                                .setFooter(`${page} • ${client.user.username}`)
                            tdata.edit({embeds : [embed]});
                        
        
                        

                        }
                        }
                        
                    })
    
                              } 

                            })  
    
         
   } else if(args[0] == "clear") {
    let tt = await db.all().filter(data => data.ID.startsWith(`owners_${client.user.id}`));
    message.channel.send(`${tt.length === undefined||null ? 0:tt.length} ${tt.length > 1 ? "personnes ont été supprimées ":"personne a été supprimée"} des owners`)


    let delowner = 0;
    for(let i = 0; i < tt.length; i++) {
      db.delete(tt[i].ID);
      delowner++;
    }

   }
} 
}