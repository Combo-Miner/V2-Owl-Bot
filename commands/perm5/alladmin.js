
const { MessageEmbed } = require('discord.js')
const color = 'BLUE'

module.exports = {
            name: 'alladmin',
            helpname : "alladmin",
            description: 'Afficher tout les membres avec les perm admin',
          
            
 /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
        
    
    run: async(client, message,args)  => {
        const color = db.get(`color_${message.guild.id}`) === null? client.config.color:db.get(`color_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if(!prefix) {
            prefix = client.config.prefix
        }
        
       
    const tempdata = []
    const admins = message.guild.members.cache.filter(
        (m) => m.permissions.has('ADMINISTRATOR')
    ).map(m => tempdata.push(m.user.id))
  

   
    let noembed = new MessageEmbed()

        .setDescription('Une erreur est survenue')
        .setTitle("Admin List")
        .setTimestamp()
        .setColor(color)
        .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
    if (tempdata.length === 0) return message.channel.send({embeds: [noembed]})


    try {
        let tdata = await message.channel.send("Chargement..")

        let p0 = 0;
        let p1 = 10;
        let page = 1;

        let embed = new MessageEmbed()

        .setTitle(`Admin ${tempdata.length}`)
           
            .setDescription(tempdata
                .filter(x => message.guild.members.cache.get(x))
                .map(r => r)
                .map((user, i) => `${i + 1} ・ **<@${message.guild.members.cache.get(user).user.id}>**`)
                .slice(0, 10)
                .join('\n') )
            .setTimestamp()
            .setColor(color)
        .setFooter(`Prefix actuel: ${prefix}  • Owls Bots`)
        let reac1
        let reac2
        let reac3

        if (tempdata.length > 10) {
            reac1 = await tdata.react("⬅");
            reac2 = await tdata.react("❌");
            reac3 = await tdata.react("➡");
        }

        tdata.edit({embeds:[embed]});

        const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

        data_res.on("collect", async (reaction) => {

            if (reaction.emoji.name === "⬅") {

                p0 = p0 - 10;
                p1 = p1 - 10;
                page = page - 1

                if (p0 < 0) {
                    return
                }
                if (p0 === undefined || p1 === undefined) {
                    return
                }


                embed.setDescription(tempdata
                    .filter(x => message.guild.members.cache.get(x))
                    .map(r => r)
                    .map((user, i) => `${i + 1} ・  **<@${message.guild.members.cache.get(user).user.id}>**`)
                    .slice(p0, p1)
                    .join('\n'))
                tdata.edit({embeds:[embed]});

            }

            if (reaction.emoji.name === "➡") {

                p0 = p0 + 10;
                p1 = p1 + 10;

                page++;

                if (p1 > tempdata.length + 10) {
                    return
                }
                if (p0 === undefined || p1 === undefined) {
                    return
                }


                embed.setDescription(tempdata
                    .filter(x => message.guild.members.cache.get(x))
                    .map(r => r)
                    .map((user, i) => `${i + 1} ・ **<@${message.guild.members.cache.get(user).user.id}>**`)
                    .slice(p0, p1)
                    .join('\n'))
                tdata.edit({embeds:[embed]});

            }

            if (reaction.emoji.name === "❌") {
                data_res.stop()
                await tdata.reactions.removeAll()
                return tdata.delete();
            }

            await reaction.users.remove(message.author.id);

        })

    } catch (err) {
        console.log(err)
    }
}};
