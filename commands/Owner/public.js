const {Message,Client,MessageActionRow,MessageButton,MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'public',
    aliases: [],
    helpname : "public <add/remove/off/clear> <salon>",
    description : "Permet de configurer les salons public",
    ownerOnly : true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => { 
        let ez = args[0]
        let color = (db.get(`color_${message.guild.id}`) == null ? client.config.color : db.get(`color_${message.guild.id}`) )
         
        if(ez == "add") {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if(!channel) return message.channel.send(`Aucun salon trouvé pour \`${args[1] == null ? "rien" : args[0]} \``)
           let get =  db.get(`channelpublic_${message.guild.id}_${channel.id}`)
           if(get == true) {
            return message.channel.send(`${channel} est déjà dans **la liste des salons publics**`)
           }
           db.set(`channelpublic_${message.guild.id}_${channel.id}`,true)
           db.set("channelspub" + message.guild.id,true)
           message.channel.send(`${channel} est maintenant dans **la liste des salons publics**`)
        }else if (ez == "off") {
            db.delete("channelspub" + message.guild.id)
            message.channel.send("Les salons publique sont mainteanant désactivé")
        } else if (ez == "remove") {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if(!channel) return message.channel.send(`Aucun salon trouvé pour \`${args[1] == null ? "rien" : args[0]} \``)
            let get =  db.get(`channelpublic_${message.guild.id}_${channel.id}`)
            if(get == null) return message.channel.send(`${channel} n'est pas dans **la liste des salons publics**`)
            db.delete(`channelpublic_${message.guild.id}_${channel.id}`)
        } else if(ez == "clear") {
        let chann =  db.all().filter(data => data.ID.startsWith(`channelpublic_${message.guild.id}`))
        let modssc = 0;
        for (let i = 0; i < chann.length; i++) {
            db.delete(chann[i].ID);
            modssc++;
        }
        db.delete("channelspub" + message.guild.id)
        message.channel.send(`${modssc} ${modssc > 1 ? "salons ont été supprimés" : "salon a été supprimé"}`)
        } else {  let money = db.all().filter(data => data.ID.startsWith(`channelpublic_${message.guild.id}`)).sort((a, b) => b.data - a.data)

        let p0 = 0;
        let p1 = 15;
        let page = 1;
    
        const embed = new MessageEmbed()
            .setTitle(`Liste des salon public`)
            .setDescription(money
            .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
            .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
            .slice(0, 15).join(`\n`)
    
            )
            .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.user.username}`)
            .setColor(color)
    
    
        message.channel.send({embeds : [embed]}).then(async tdata => {
            if (money.length > 15) {
                const B1 = new MessageButton()
                .setLabel((db.get("helpedit_left"))  === null ? "👈" : db.get('helpedit_left'))
                .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                    .setCustomId('publiclist1');
    
                const B2 = new MessageButton()
                .setLabel((db.get("helpedit_right"))  === null ? "👉" : db.get('helpedit_right'))
                .setStyle((db.get("helpstyle") == null ? "PRIMARY" : db.get('helpstyle')))
                    .setCustomId('publiclist2');


                
    
                const bts = new MessageActionRow().addComponents([B1,B2])
                tdata.edit({ embeds: [embed], components: [bts] })
                setTimeout(() => {
                    tdata.edit( {
                        components: [], embeds: [new MessageEmbed()
                        .setTitle(`Salon Public`)
                        .setDescription(money
                        .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
                        .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
                        .slice(0, 15).join(`\n`)
                
                        )
                            .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                            .setColor(color)]
    
    
                    })
                    // message.channel.send(embeds)
                }, 60000 * 5)
                client.on("interactionCreate", (button) => {
                    if(!button.isButton()) return;
                    if (button.user.id !== message.author.id) return button.reply({content : "Vous n'êtes pas autorisé à utilisé cette interaction",ephemeral : true})
                    if (button.customId == "publiclist1") {
                        button.deferUpdate()
                        
    
                        p0 = p0 - 15;
                        p1 = p1 - 15;
                        page = page - 1
    
                        if (p0 < 0) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }
    
    
                        embed   .setDescription(money
                          .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
                          .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
                          .slice(p0,p1).join(`\n`)
                  
                          )
                              .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.config.name}`)
                        tdata.edit({embeds : [embed]});
    
                    }
                    if (button.customId == "publiclist2") {
                        button.deferUpdate()
                    
    
                        p0 = p0 + 15;
                        p1 = p1 + 15;
    
                        page++;
    
                        if (p1 > money.length + 15) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }
    
    
                        embed   .setDescription(money
                          .filter(x => message.guild.channels.cache.get(x.ID.split('_')[2]))
                          .map((m, i) => `${i + 1}) <#${message.guild.channels.cache.get(m.ID.split('_')[2]).id}> (${m.ID.split('_')[2]})`)
                          .slice(p0, p1).join(`\n`)
                  
                          )
                              .setFooter(`${page}/${Math.ceil(money.length === 0?1:money.length / 15)} • ${client.user.username}`)
                        tdata.edit({embeds : [embed]});
    
                    }
                })
            }
    
    })
}
}}