const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const { ownerID } = require('../../config.json')
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    name: "whitelist",
    helpname : "whitelist [add/remove/clear] <membre>",
    description: "Permet de configurer la whitelist",
    ownerOnly: true,
    emoji: '🔱',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let color = config.color
        ;

            if(args[0] == "add") { 
            const user = message.mentions.users.first() || client.users.cache.get(args[1])
            if (!user) return;
            let link  = db.get(`whitelist_${client.user.id}_${user.id}`)
            if(link == true) {
                return message.channel.send(`${user.username} est déjà whitelist`)
            } else { 
            db.set(`whitelist_${client.user.id}_${user.id}`, true)
             message.channel.send(`${user.username} est mainteanant whitelist`)
        }
    } else if(args[0] == "remove")
    {
        let user = message.mentions.users.first() || client.users.cache.get(args[1])
        if(!user) return;
        let link = db.get(`whitelist_${client.user.id}_${user.id}`)
        if(link == true ) {
            db.delete(`whitelist_${client.user.id}_${user.id}`)
            message.channel.send(`${user.username} n'est plus whitelist `)
        } else {
            message.channel.send(`${user.username} n'est pas whitelist `)
        }
    } else if(!args[0]) {
        let money = db.all().filter(data => data.ID.startsWith(`whitelist_${client.user.id}`)).sort((a, b) => b.data - a.data) 
        let p0 = 0;
        let p1 = 15;
        let page = 1;

        let ez = money
        .filter(x => client.users.cache.get(x.ID.split('_')[2]))
        .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}>(${client.users.cache.get(m.ID.split('_')[2]).id})`)
        .slice(0, 15)
       
    
        const embed = new MessageEmbed()
            .setTitle('WhiteList')
            .setDescription(ez.join()
    
            )
            .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.user.username}`)
            .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
            message.channel.send({embeds : [embed]}).then(async tdata => {
                if (money.length > 15) {
                    
                    const B1 = new MessageButton()
                    .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
                    .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                        .setCustomId('wl1');
        
                    const B2 = new MessageButton()
                    .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
                    .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                        .setCustomId('wl2');
        
                    const bts = new MessageActionRow()
                        .addComponents([B1,B2])
                    tdata.edit({ embeds: [embed], components: [bts] })
                        tdata.edit({
                            components: [], embeds: new [MessageEmbed()
                                .setTitle('Whitelist')
                                .setDescription(money
                                    .filter(x => client.users.cache.get(x.ID.split('_')[2]))
                                    .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}> (${client.users.cache.get(m.ID.split('_')[2]).id})`)
                                    .slice(0, 15)
                                    .join()
        
                                )
                                .setFooter(`1/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.user.username}`)
                                .setColor((db.get(`color_${message.guild.id}`) == null ? config.color : db.get(`color_${message.guild.id}`) ))
        
        
                        ]})
                        message.channel.send({embeds : [embed]})
                    client.on("interactionCreate", async (i) => {
                        if(i.isButton()) { 
                        if(i.user.id !== message.author.id) return;
                        if(i.customId == "wl1") {
                            i.deferUpdate()
                            p0 = p0 - 15;
                            p1 = p1 - 15;
                            page = page - 1
        
                            if (p0 < 0) {
                                return;
                            }
                            if (!p0||!p1) {
                                return;
                            }
                            embed.setDescription(money
                                .filter(x => client.users.cache.get(x.ID.split('_')[2]))
                                .map((m, i) => `\n${i + 1}) <@${client.users.cache.get(m.ID.split('_')[2]).id}> (${client.users.cache.get(m.ID.split('_')[2]).id})`)
                                .slice(p0, p1)
                                .join()
        
                            )
                                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.user.username}`)
                            tdata.edit({embeds : [embed]});
        
                        } else if (i.customId == "wl2") {
                            i.deferUpdate()
                            p0 = p0 + 15;
                            p1 = p1 + 15;
                            page++;
                            if (p1 > money.length + 15) {
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
                                .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.user.username}`)
                            tdata.edit({embeds : [embed]});
                        
        
                        

                        }
                        }
                        
                    })
    
                              } 

                            })  
    
         
   } else if(args[0] == "clear") {
    let tt = await db.all().filter(data => data.ID.startsWith(`whitelist_${client.user.id}`));
    message.channel.send(`${tt.length === undefined||null ? 0:tt.length} ${tt.length > 1 ? "personnes ont été supprimées ":"personne a été supprimée"} de la whitelist`)


    let delowner = 0;
    for(let i = 0; i < tt.length; i++) {
      db.delete(tt[i].ID);
      delowner++;
    }

   }
} 
}