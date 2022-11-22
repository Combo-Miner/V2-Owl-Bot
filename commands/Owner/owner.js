const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const { ownerID } = require('../../config.json')
const db = require('quick.db');
const config = require("../../config.json")
const bot = require("../../models/mybot")

module.exports = {
    name: "owner",
    helpname : "owner [add/remove/list/clear] <membre>",
    description: "Permet de configurer les owner",
    emoji: '🔱',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let color = (db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) )

       
            if(args[0] == "add") { 
                if(message.author.id !== ownerID) return;
            const user = message.mentions.users.first() || client.users.cache.get(args[1])
            if (!user) return;
            let link  = db.get(`owners_${client.user.id}_${user.id}`)
            if(link == true) {
                return message.channel.send(`${user.username} est déjà owner`)
            } else { 
            db.set(`owners_${client.user.id}_${user.id}`, true)

  
             message.channel.send(`${user.username} est mainteanant owner`)
        }
    } else if(args[0] == "remove")
    {
        if(message.author.id !== ownerID) return;
        let user = message.mentions.users.first() || client.users.cache.get(args[1])
        if(!user) return;
        let link = db.get(`owners_${client.user.id}_${user.id}`)
        if(link == true ) {
            db.delete(`owners_${client.user.id}_${user.id}`)
            message.channel.send(`${user.username} n'est plus owner `)
        } else {
            message.channel.send(`${user.username} n'est pas owner `)
        }
    } else if(args[0] == "list") {
        let money = db.all().filter(data => data.ID.startsWith(`owners_${client.user.id}`)).sort((a, b) => b.data - a.data) 
        let p0 = 0;
        let p1 = 1;
        let page = 1;

        let ez = money
        .filter(x => client.users.cache.get(x.ID.split('_')[2]))
        .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}>(${client.users.cache.get(m.ID.split('_')[2]).id})`)
        .slice(0, 10)
       
    
        const embed = new MessageEmbed()
            .setTitle('Owner')
            .setDescription(ez.join()
    
            )
            .setFooter(`${page}/${Math.ceil(money.length / 10)} • ${client.user.username}`)
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
            message.channel.send({embeds : [embed]}).then(async tdata => {
                if (money.length > 10) {

                
                    const B1 = new MessageButton()
                    .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
                    .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                        .setCustomId('owner1');
        
                    const B2 = new MessageButton()
                    .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
                    .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                        .setCustomId('owner2');
        
                    const bts = new MessageActionRow()
                        .addComponents([B1,B2])
                    tdata.edit({ embeds: [embed], components: [bts] })
                    client.on("interactionCreate", async (i) => {
                        if(i.isButton()) { 
                        if(i.user.id !== message.author.id) return i.replyreply({content : "Vous n'êtes pas autorisé à utilisé cette interaction",ephemeral : true})
                        if(i.customId == "owner1") {
                            i.deferUpdate()
                            p0 = p0 - 10;
                            p1 = p1 - 10;
                            page = page - 1
        
                            if (p0 < 0)  return;
                            if (i1 < 9) return tdata.delete();
                            if (!p0|| !p1) return;
                            
                            embed.setDescription(money
                                .filter(x => client.users.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}> (${client.users.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
                                .join()
        
                            )
                            .setFooter(`${page}/${Math.ceil(money.length / 10)} • ${client.user.username}`)
                            tdata.edit({embeds : [embed]});
        
                        } else if (i.customId == "owner2") {
                            i.deferUpdate()
                            p0 = p0 + 10;
                            p1 = p1 + 10;
                            page++;
                            if (p1 > money.length + 10) {
                                return
                            }
                            if (!i0 || !i1) return tdata.delete();
        
        
                            embed.setDescription(money
                                .filter(x => client.users.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}> (${client.users.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
                                .join()
        
                            )
                            .setFooter(`${page}/${Math.ceil(money.length / 10)} • ${client.user.username}`)
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